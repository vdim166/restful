import { Request, Response } from "express"
import { handleError } from "../utils"
import bookStore from "../db/BookStore"

export default {
  createNewBook: async (req: Request, res: Response) => {
    const { title, author, publicationDate, genres } = req.body
    try {
      const book = await bookStore.createNewBook(
        title,
        author,
        publicationDate,
        genres
      )
      res.json(book)
    } catch (error) {
      handleError(error, res)
    }
  },

  getAllBooks: async (req: Request, res: Response) => {
    try {
      const books = await bookStore.getAllBooks()
      res.json(books)
    } catch (error) {
      handleError(error, res)
    }
  },
  getBookById: async (req: Request, res: Response) => {
    try {
      const book = await bookStore.getBookById(req.params.id)
      if (!book) return res.status(404).json({ error: "Book not found" })
      res.json(book)
    } catch (error) {
      handleError(error, res)
    }
  },
  updateBook: async (req: Request, res: Response) => {
    const { title, author, publicationDate, genres } = req.body
    try {
      const book = await bookStore.updateBook(
        req.params.id,
        title,
        author,
        publicationDate,
        genres
      )

      if (!book) return res.status(404).json({ error: "Book not found" })
      res.json(book)
    } catch (error) {
      handleError(error, res)
    }
  },
  deleteBook: async (req: Request, res: Response) => {
    try {
      const book = await bookStore.deleteBook(req.params.id)
      if (!book) return res.status(404).json({ error: "Book not found" })
      res.json({ message: "Book deleted" })
    } catch (error) {
      handleError(error, res)
    }
  },
}
