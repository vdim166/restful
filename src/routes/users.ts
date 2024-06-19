import { Router } from "express"
import auth from "../middleware/auth"
import admin from "../middleware/admin"
import usersController from "../controller/usersController"

const router = Router()

router.post("/register", usersController.registerUser)
router.post("/login", usersController.loginUser)
router.get("/me", auth, usersController.fetchUser)
router.put("/:id/role", [auth, admin], usersController.changeRole)
router.get("/verify-email", usersController.verifyEmail)

export default router
