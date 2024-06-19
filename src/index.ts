import express from "express"
import mongoose from "mongoose"
import config from "config"

import booksRoute from "./routes/books"
import usersRoute from "./routes/users"

const run = () => {
  const app = express()

  app.use(express.json())

  app.use("/books", booksRoute)
  app.use("/users", usersRoute)

  mongoose
    .connect(config.get("mongoURI"))
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err))

  const port = process.env.PORT || 5000
  app.listen(port, () => console.log(`Server running on port ${port}`))
}

run()
