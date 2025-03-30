import express from 'express';
import {
    getBooks,
    getBookById,
    postBook,
    deleteBook,
    updateBook
} from '../controller/controller.js';

const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', postBook);
router.delete('/:id', deleteBook);
router.put('/:id', updateBook);

export default router;
