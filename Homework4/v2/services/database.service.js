import fs from "fs/promises"; // Use the promises version of fs

export const FILE_PATH = "./db/books_store.db.json";

// Retrieve all books from the database
export const retrieveBooks = async () => {
    try {
        const data = await fs.readFile(FILE_PATH, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading books from database:', error);
        throw error; // Rethrow the error for handling in the controller
    }
};

// Create a new book in the database
export const createBooks = async (newBook) => {
    try {
        // Read all existing books
        const books = await retrieveBooks();
        // Add the new book to the list
        books.push(newBook);
        // Write back to the database
        await fs.writeFile(FILE_PATH, JSON.stringify(books, null, 2));
    } catch (error) {
        console.error('Error writing book to database:', error);
        throw error; // Rethrow the error for handling in the controller
    }
};
