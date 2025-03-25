import {
    getAllBooks,
    createBook,
    findBookById,
    deleteBookById,
    updateBookById
} from '../model/model.js';

export const getBooks = async (req, res) => {
    try {
        const books = await getAllBooks();
        res.send(books);
    } catch (error) {
        res.status(500).send('Error retrieving books');
    }
};

export const getBookById = async (req, res) => {
    try {
        const book = await findBookById(req.params.id);
        if (book) {
            res.send(book);
        } else {
            res.status(404).send('Book not found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving book');
    }
};

export const postBook = async (req, res) => {
    const newBook = req.body;

    if (!newBook.bookTitle || typeof newBook.isAvailable !== 'boolean' || !newBook.genre || !newBook.author || !newBook.pages) {
        return res.status(400).send('Invalid book data');
    }

     // const book = {
        //     id: uuid(),
        //     bookTitle: newBook.bookTitle,
        //     isAvailable: newBook.isAvailable,
        //     genre: newBook.genre,
        //     author: newBook.author,
        //     pages: newBook.pages,
        // };

    try {
        const book = await createBook(newBook);
        res.status(201).send({ message: `Book created with id: ${book.id}` });
    } catch (error) {
        res.status(500).send('Error creating book');
    }
};

export const deleteBook = async (req, res) => {
    try {
        const book = await findBookById(req.params.id);
        if (book) {
            await deleteBookById(req.params.id);
            res.status(204).send(); // No content to send back
        } else {
            res.status(404).send('Book not found');
        }
    } catch (error) {
        res.status(500).send('Error deleting book');
    }
};

export const updateBook = async (req, res) => {
    try {
        const updatedBook = await updateBookById(req.params.id, req.body);
        if (updatedBook) {
            res.send(updatedBook);
        } else {
            res.status(404).send('Book not found');
        }
    } catch (error) {
        res.status(500).send('Error updating book');
    }
};
