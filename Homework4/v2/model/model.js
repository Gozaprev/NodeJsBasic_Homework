// import { v4 as uuid } from "uuid";
// import { retrieveBooks, createBooks } from '../services/database.service.js';

// let books = []; // This will act as an in-memory database for simplicity


// export const getAllBooks = () => {
//     return retrieveBooks();
// };

// export const createBook = (bookData) => {
//     const book = {
//         id: uuid(),
//         ...bookData,
//     };
//     books.push(book);
//     return book;
// };

// export const findBookById = (id) => {
//     return books.find(book => book.id === id);
// };

// export const deleteBookById = (id) => {
//     books = books.filter(book => book.id !== id);
// };

// export const updateBookById = (id, updatedData) => {
//     const bookIndex = books.findIndex(book => book.id === id);
//     if (bookIndex !== -1) {
//         books[bookIndex] = { 
//             ...books[bookIndex], 
//             ...updatedData 
//         };
//         return books[bookIndex];
//     }
//     return null;
// };

import fs from "fs/promises";
import { v4 as uuid } from "uuid";
import { retrieveBooks, createBooks, FILE_PATH } from '../services/database.service.js'; //

export const getAllBooks = async () => {
    return await retrieveBooks();
};

export const createBook = async (bookData) => {
    const book = {
        id: uuid(),
        ...bookData,
    };
    await createBooks(book);
    return book;

   
};

export const findBookById = async (id) => {
    const books = await retrieveBooks();
    return books.find(book => book.id === id);
};

export const deleteBookById = async (id) => {
    const books = await retrieveBooks();
    const updatedBooks = books.filter(book => book.id !== id);
    await fs.writeFile(FILE_PATH, JSON.stringify(updatedBooks, null, 2));
};

export const updateBookById = async (id, updatedData) => {
    const books = await retrieveBooks();
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex !== -1) {
        books[bookIndex] = { 
            ...books[bookIndex], 
            ...updatedData 
        };
        await fs.writeFile(FILE_PATH, JSON.stringify(books, null, 2));
        return books[bookIndex];
    }
    return null;
};
