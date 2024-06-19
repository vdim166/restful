import mongoose from "mongoose"

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publicationDate: { type: Date, required: true },
  genres: { type: [String], required: true },
})

export default mongoose.model("Book", BookSchema)
