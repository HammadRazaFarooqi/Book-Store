import express, { response } from "express";
import { PORT, MONGO_URI } from "./config.js";
import mongoose from "mongoose";
// import { Book } from "./models/bookModel.js";
import booksRouter from "./routes/booksRoutes.js";
import cors from "cors";

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//get call on /
app.get("/", (req, res) => {
  return res.status(200).send("Hello World");
});

app.use("/books", booksRouter);


//mongo connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error:", error);
  });
