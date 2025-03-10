import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },    
    publishedYear: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,  // This will enable createdAt and updatedAt fields
}); 

export const Book = mongoose.model("Book", bookSchema);
