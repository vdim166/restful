import Book from "../models/Book"

class BookStore {
  async createNewBook(
    title: string,
    author: string,
    publicationDate: string,
    genres: string[]
  ) {
    const book = new Book({ title, author, publicationDate, genres })
    await book.save()
    return book
  }

  async getAllBooks() {
    const books = await Book.find()

    return books
  }

  async getBookById(id: string) {
    const book = await Book.findById(id)

    return book
  }

  async updateBook(
    id: string,
    title: string,
    author: string,
    publicationDate: string,
    genres: string[]
  ) {
    const book = await Book.findByIdAndUpdate(
      id,
      { title, author, publicationDate, genres },
      { new: true }
    )

    return book
  }

  async deleteBook(id: string) {
    const book = await Book.findByIdAndDelete(id)

    return book
  }
}

const bookStore = new BookStore()

export default bookStore
