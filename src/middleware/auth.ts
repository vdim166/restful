import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import config from "config"

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token")
  if (!token)
    return res.status(401).json({ error: "No token, authorization denied" })

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"))
    req.user = decoded as User

    next()
  } catch (e) {
    res.status(400).json({ error: "Token is not valid" })
  }
}
