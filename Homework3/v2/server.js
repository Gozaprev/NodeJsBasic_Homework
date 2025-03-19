import express from "express";
import fs from "fs";
import { retrieveBooks, createBooks } from "./database.service.js"; 
import { v4 as uuid } from "uuid"; 

const server = express(); 


server.use(express.json());

const PORT = 3001;
const HOST = "localhost";

// Log request details
server.use((req, res, next) => {
    const logEntry = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url
    };

    
    console.log(logEntry);

   // Bad practice, not followed the JSON standards of writing
 /*   fs.appendFile('logs.json', JSON.stringify(logEntry) + ',\n', (err) => {
        if (err) {
            console.error('Error writing to logs.json', err);
        }
    });
*/
    

    
    let logs = [];
    try {
        const data = fs.readFileSync('logs.json', 'utf8');
        logs = JSON.parse(data); 
    } catch (err) {
        // If the file doesn't exist or is empty, we start with an empty array
        // if (err.code !== 'ENOENT') {
            console.error('Error reading logs.json', err);
        // }
    }

    // Push the new log entry to the array
    logs.push(logEntry);

    // Write the updated logs back to the file
    try {
        fs.writeFileSync('logs.json', JSON.stringify(logs, null, 2)); // Write with pretty print
    } catch (err) {
        console.error('Error writing to logs.json', err);
    }

    next();
});


// Route to get all books
server.get('/books', (req, res) => {
    const books = retrieveBooks();
    res.send(books);
});

// Route to add a new book
server.post('/books', (req, res) => {
    const newBook = req.body;

    // Validate the new book data
    if (!newBook.bookTitle || typeof newBook.isAvailable !== 'boolean' || !newBook.genre || !newBook.author || !newBook.pages) {
        return res.status(400).send('Invalid book data');
    }

    const book = {
        id: uuid(), 
        bookTitle: newBook.bookTitle, 
        isAvailable: newBook.isAvailable,
        genre: newBook.genre,
        author: newBook.author,
        pages: newBook.pages
    };

    console.log(book);

    createBooks(book);
    res.status(201).send({ message: `Book created with id: ${book.id}` }); 
});

server.listen(PORT, HOST, () => {
    console.log(`Server is up and running on: http://${HOST}:${PORT} 🚀🚀🚀`);
});
