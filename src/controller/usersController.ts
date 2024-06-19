import { Request, Response } from "express"
import { handleError, sendVerificationEmail } from "../utils"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import config from "config"
import usersStore from "../db/UsersStore"

export default {
  registerUser: async (req: Request, res: Response) => {
    const { username, password, email } = req.body
    try {
      const user = await usersStore.createUser(username, password, email)

      const token = jwt.sign({ id: user._id }, config.get("jwtSecret")!, {
        expiresIn: "1h",
      })

      res.json(user)

      await sendVerificationEmail(user, token)
    } catch (error) {
      handleError(error, res)
    }
  },
  loginUser: async (req: Request, res: Response) => {
    const { username, password } = req.body
    try {
      const user = await usersStore.findUserByUsername(username)
      if (!user) return res.status(400).json({ error: "Invalid credentials" })

      if (user.isVerified === false)
        return res.status(400).json({ error: "Please verify your account" })

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch)
        return res.status(400).json({ error: "Invalid credentials" })

      const token = jwt.sign(
        { id: user._id, role: user.role },
        config.get("jwtSecret")!,
        { expiresIn: "1h" }
      )
      res.json({ token })
    } catch (error) {
      handleError(error, res)
    }
  },
  fetchUser: async (req: Request, res: Response) => {
    try {
      if (!req.user) throw new Error("Not authenticated")

      const user = await usersStore.findUserByIdWithoutPassword(req.user.id)

      res.json(user)
    } catch (error) {
      handleError(error, res)
    }
  },
  changeRole: async (req: Request, res: Response) => {
    const { role } = req.body
    try {
      if (!req.user) return res.status(404).json({ error: "User is not valid" })

      const user = await usersStore.changeRole(req.user.id, role)

      if (!user) return res.status(404).json({ error: "User not found" })
      res.json(user)
    } catch (error) {
      handleError(error, res)
    }
  },

  verifyEmail: async (req: Request, res: Response) => {
    const { token } = req.query

    try {
      const decoded = jwt.verify(token as string, config.get("jwtSecret")!)

      const userObj = decoded as User

      await usersStore.verifyEmail(userObj.id)

      res.status(200).json({ msg: "Email verified successfully" })
    } catch (err) {
      handleError(err, res)
    }
  },
}
