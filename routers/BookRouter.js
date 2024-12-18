import express from "express";
import BookController from "../controllers/BookController.js";

const BookRouter= express.Router();

BookRouter.post("/create-book", BookController.insertBook);
BookRouter.get("/:id", BookController.getBookById);
BookRouter.get("/",BookController.getBooks);
BookRouter.put("/update-book", BookController.updateBook);
BookRouter.delete("/:id", BookController.deleteBook);

export default BookRouter;