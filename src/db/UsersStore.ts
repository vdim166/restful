import { Document } from "mongoose"
import User from "../models/User"

class UsersStore {
  async createUser(username: string, password: string, email: string) {
    const user = new User({ username, password, email })
    await user.save()

    return user
  }

  async findUserByUsername(username: string) {
    const user = await User.findOne({ username })

    return user
  }

  async changeRole(id: string, role: string) {
    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select("-password")

    return user
  }

  async findById(id: string) {
    const user = await User.findById(id)

    return user
  }

  async findUserByIdWithoutPassword(id: string) {
    const user = await User.findById(id).select("-password")
    return user
  }

  async verifyEmail(id: string) {
    const user = await usersStore.findById(id)

    if (!user) {
      throw new Error("Invalid token")
    }

    user.isVerified = true
    await user.save()
  }
}

const usersStore = new UsersStore()
export default usersStore
