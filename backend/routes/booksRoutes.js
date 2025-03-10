import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();
//post call on /books means add new book
router.post("", async (req, res) => {
    try {
      console.log(req.body);
      if (!req.body.title || !req.body.author || !req.body.publishedYear) {
        return res.status(400).send({ message: "Please fill all the fields" });
      }
  
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishedYear: req.body.publishedYear,
      };
      const book = await Book.create(newBook);
      return res.status(201).send(book);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
  // display all books
  router.get("/",async (req, res) => {
    try {
      const books = await Book.find();
      return res.status(200).json({
        count: books.length,
        data: books,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
  //display book by id
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const book = await Book.findById(id);
      return res.status(200).json(book);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
  //update book by id
  router.put("/:id", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishedYear) {
        return res.status(400).send({ message: "Please fill all the fields" });
      }
      const { id } = req.params;
      const result = await Book.findByIdAndUpdate(id, req.body);
      if (!result) {
        return res.status(404).send("Book not found");
      }
      return res.status(200).send("book updated successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
  //delete book by id
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Book.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).send("Book not found");
      }
      return res.status(200).send("book deleted successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ message: error.message });
    }
  });

  export default router;