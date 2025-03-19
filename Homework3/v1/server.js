import express from "express";
import fs from "fs";
import { retrieveBooks, createBooks } from "./database.service.js"; // named-import
import { v4 as uuid } from "uuid"; // external-package to create IDs


const server = express(); // instance of the express

// This config. will allow our BE to understand and parse JSON request body
server.use(express.json());

const PORT = 3001;
const HOST = "localhost";

// Middleware to log request details
server.use((req, res, next) => {
    const logEntry = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url
    };

    // Log to console
    console.log(logEntry);

    // Append log to logs.json
    fs.appendFile('logs.json', JSON.stringify(logEntry) + ',\n', (err) => {
        if (err) {
            console.error('Error writing to logs.json', err);
        }
    });

    next();
});

// Middleware to parse JSON bodies
//server.use(bodyParser.json());


// Route to get all books
// server.get('/books', (req, res) => {
//     fs.readFile('books_store.db.json', 'utf8', (err, data) => {
//         if (err) {
//             return res.status(500).send('Error reading books data');
//         }
//         res.json(JSON.parse(data));
//     });
// });

server.get('/books', (request, response) => {
    const books = retrieveBooks()

    response.send(books)
});

// Route to add a new book
server.post('/books', (req, res) => {
    const newBook = req.body;

    // Validate the new book data
    if (!newBook.id || !newBook.bookTitle || typeof newBook.isAvailable !== 'boolean' || !newBook.genre || !newBook.author || !newBook.pages) {
        return res.status(400).send('Invalid book data');
    }

    const book = {
        id: uuid(),
        bookTitle: body.name,
        isAvailable: body.isAvailable,
        genre: body.genre,
        author: body.author,
        pages: body.pages
    };

    

    console.log(book);

    createBooks(book);
    // response.statusCode = 201;
    // response.send({message: `Product created with id: ${product.id}`})

    // same as above but a bit shorter
    response.status(201).send({message: `Product created with id: ${book.id}`})

    // fs.readFile('books_store.db.json', 'utf8', (err, data) => {
    //     if (err) {
    //         return res.status(500).send('Error reading books data');
    //     }

    //     const books = JSON.parse(data);
    //     books.push(newBook);

    //     fs.writeFile('books_store.db.json', JSON.stringify(books, null, 2), (err) => {
    //         if (err) {
    //             return res.status(500).send('Error saving new book');
    //         }
    //         res.status(201).send('Book added successfully');
    //     });
    // });
});

////////////////////////////////////////////////////
// // if(method === "POST" && url === "/products")
// server.post('/products', (request, response) => {
//     // request.body is the property that contains the body send with the request. The body is of type json, that's why we must use server.use(express.json()) so the server understands how to parse JSON request body info.
//     const body = request.body;
//     console.log(body)

//     const product = {
//         id: uuid(),
//         name: body.name,
//         color: body.color,
//         size: body.size,
//         material: body.material,
//         price: body.price
//     };


//     console.log(product)

//     createProduct(product);
//     // response.statusCode = 201;
//     // response.send({message: `Product created with id: ${product.id}`})

//     // same as above but a bit shorter
//     response.status(201).send({ message: `Product created with id: ${product.id}` })
// })
// ///////////////////////////////////////////////////////////


//   server.get('/books', (request, response) => {
//     const books = retrieveBooks()

//     response.send(books)
// });

// // if(method === "POST" && url === "/products")
// server.post('/books', (request, response) => {
//     // request.body is the property that contains the body send with the request. The body is of type json, that's why we must use server.use(express.json()) so the server understands how to parse JSON request body info.
//     const body = request.body;
//     console.log(body)

//     const book = {
//         id: uuid(),
//         name: body.name,
//         color: body.color,
//         size: body.size,
//         material: body.material,
//         price: body.price
//     };


//     console.log(book)

//     createBooks(book);
//     // response.statusCode = 201;
//     // response.send({message: `Product created with id: ${product.id}`})

//     // same as above but a bit shorter
//     response.status(201).send({message: `Product created with id: ${book.id}`})
// })






server.listen(PORT, HOST, () => {
    console.log(`Server is up and running on: http://${HOST}:${PORT} 🚀🚀🚀`)
}); 

//http://localhost:3001/products