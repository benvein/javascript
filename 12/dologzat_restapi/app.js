import express from 'express';
import * as db from "./util/database.js";

const port = 8080;
const app = express();
app.use(express.json());

app.get('/books', (req,res) => {
    try{
        const books = db.getAllBooks();
        res.status(200).json(books);
    }
    catch(err){
        res.status(500).json(err);
    }
});

app.get('/books/:id', (req,res) => {
    try{
        const book = db.getBook(req.params.id);
        if(!book){
            return res.status(404).json({message: "book not found"});
        }
        res.status(200).json(book);
    }
    catch(err){
        res.status(500).json(err);
    }
});

app.post('/books', (req,res) => {
    try{
        const {title, author} = req.body;
        if(!title ||!author){
            res.status(400).json({message: "everything required"});
        }
        const newBook = db.saveBook(title, author);
        res.status(201).json(newBook);
    }
    catch(err){
        res.status(500).json(err);
    }
});

app.delete('/books/:id', (req,res) => {
    try{
        const deletedBook = db.deleteBook(req.params.id);
        if(!deletedBook){
            res.status(404).json({message: "book not found"});
        }
        res.status(204).json();
    }
    catch(err){
        res.status(500).json(err);
    }
})

app.listen(port, () =>{
    console.log(`running on ${port}`);
})