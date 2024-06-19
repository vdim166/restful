import { Router } from "express"
import auth from "../middleware/auth"
import admin from "../middleware/admin"
import booksController from "../controller/booksController"

const router = Router()

router.post("/", [auth, admin], booksController.createNewBook)
router.get("/", booksController.getAllBooks)
router.get("/:id", booksController.getBookById)
router.put("/:id", [auth, admin], booksController.updateBook)
router.delete("/:id", [auth, admin], booksController.deleteBook)

export default router
