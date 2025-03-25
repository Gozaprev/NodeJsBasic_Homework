import express from "express";
import fs from "fs";
import { retrieveBooks, createBooks } from "./database.service.js";
import { v4 as uuid } from "uuid";

const server = express();

server.use(express.json());

const PORT = 3001;
const HOST = "localhost";


const logRequest = (req) => {
    const logEntry = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
    };

    console.log(logEntry);

    let logs = [];
    try {
        const data = fs.readFileSync('logs.json', 'utf8');
        logs = JSON.parse(data);
    } catch (err) {
        console.error('Error reading logs.json', err);
    }

    logs.push(logEntry);

    try {
        fs.writeFileSync('logs.json', JSON.stringify(logs, null, 2)); 
    } catch (err) {
        console.error('Error writing to logs.json', err);
    }
};

server.use((req, res, next) => {
    logRequest(req);
    next();
});


server.get('/books', (req, res) => {
    const books = retrieveBooks();
    res.send(books);
});


server.post('/books', (req, res) => {
    const newBook = req.body;

    
    if (!newBook.bookTitle || typeof newBook.isAvailable !== 'boolean' || !newBook.genre || !newBook.author || !newBook.pages) {
        return res.status(400).send('Invalid book data');
    }

    const book = {
        id: uuid(),
        bookTitle: newBook.bookTitle,
        isAvailable: newBook.isAvailable,
        genre: newBook.genre,
        author: newBook.author,
        pages: newBook.pages,
    };

    console.log(book);

    createBooks(book);
    res.status(201).send({ message: `Book created with id: ${book.id}` });
});

server.listen(PORT, HOST, () => {
    console.log(`Server is up and running on: http://${HOST}:${PORT} 🚀🚀🚀`);
});
