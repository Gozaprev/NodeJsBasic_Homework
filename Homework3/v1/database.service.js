import fs from "fs";

// // named export 
// export const retrieveProducts = () => {
//     const products = fs.readFileSync('./database/products.json', "utf8");

//     return JSON.parse(products);
// };

// // named export
// export const createProduct = (newProduct) => {
//     // 1. reads all products
//     const products = retrieveProducts();
//     // 2. add new product to the list
//     products.push(newProduct);

//     // 3. write back to the products.json all of the products
//     fs.writeFileSync('./database/products.json', JSON.stringify(products, null, 2))
// }

// named export 
export const retrieveBooks = () => {
    const books = fs.readFileSync('./books_store.db.json', "utf8");

    return JSON.parse(books);
};

// named export
export const createBooks = (newBook) => {
    // 1. reads all books
    const books = retrieveBooks();
    // 2. add new book to the list
    books.push(newBook);

    // 3. write back to the products.json all of the products
    fs.writeFileSync('./books_store.db.json', JSON.stringify(books, null, 2))
}

// export const removeById = (id) => {
//     const books = retrieveBooks();

//     const isExisting = books.find((book) => book.id === id);
//     console.log(isExisting)

//     // we threw an error if the product does not exists
//     if(!isExisting){
//         throw new Error(`Product with id:${id} is not existing`);
//     };

//     const remainingBooks = books.filter((book) => {
//         return book.id !== id;
//     });
//     fs.writeFileSync('./books_store.db.json', JSON.stringify(remainingBooks, null, 2))
// }


// export const updateBookById = (id, newBookValues) => {
//     const books = retrieveBooks();

//     const newValues = books.map((book) => {
//         // this is the product that we want to update
//         if(book.id === id){
//             return {
//                 id: product.id,
//                 bookTitle: newBookValues.name || book.name, // if new value for name is not provided, the older one is taken into account. NOTE: IT applies for all the rest.
//                 isAvailable: newBookValues.isAvailable || book.isAvailable,
//                 genre: newBookValues.genre || book.genre,
//                 author: newProductValues.author || book.author,
//                 pages: newProductValues.pages || book.pages
//             }

//             // Using spread
//             // return {
//             //     ...product,
//             //     ...newProductValues
//             // }
//         }
//         return book
//     });

//     fs.writeFileSync('./books_store.db.json', JSON.stringify(newValues, null, 2))
// }

// [
    // {
    //     "id": "4",
    //     "bookTitle": "Name",
    //     "isAvailable": true,
    //     "genre": "adventure",
    //     "author": "John Doe",
    //     "pages": 1000
    // }
// ]