import { Router } from "express";
import { getDatabaseInstance } from "../database/mongo-connection.js";
import { ObjectId } from "mongodb"; // Import ObjectId to handle MongoDB IDs

const productRouter = Router();

// GET ALL PRODUCTS
productRouter.get('/products', async (req, res) => {
    // get database instance
    const db = getDatabaseInstance();

    // connect to a specific collection
    const collection = db.collection("products-collection");

    // read the raw documents
    const documents = await collection.find() // find() will return all of the raw documents saved in that collection
    // console.log(documents);

    // .toArray is going to extract the data from the raw document
    const products = await documents.toArray()

    res.send(products);
});

// GET PRODUCT BY ID
productRouter.get('/products/:id', async (req, res) => {
    try {
        const db = getDatabaseInstance();
        const collection = db.collection("products-collection");

        // Convert the ID string to a MongoDB ObjectId
        const productId = new ObjectId(req.params.id);

        // Find the product by ID
        const product = await collection.findOne({ _id: productId });

        if (!product) {
            return res.status(404).send({ message: "Product not found." });
        }

        res.send(product);
    } catch (error) {
        // Handle invalid ObjectId format
        res.status(400).send({ message: "Invalid product ID format." });
    }
});



// CREATE NEW PRODUCT
productRouter.post('/products', async (req, res) => {
    // 1. read the req. body
    const body = req.body; // send within the request 

    if(isNaN(+body.price)){
        return res.status(400).send({message: "Price must be string of digits!!!", field: "price"})
    };

    if(typeof body.price === "number"){
        return res.status(400).send({message: "Price must be a string and not a number.", field: "price"})
    };

    // Validate the request body informations that the user/client is sending
    if(!body.title.trim() || !body.price.trim()){
        return res.status(400).send({message: "Invalid request body, please provide price or title"})
    };

    if(body.title.trim().length > 30 || body.price.trim().length > 10){
        return res.status(400).send({message: "Price or Title values are long"})
    };

    // 2. create a new plain product object that is about to get saved into mongo
    const product = {
        title: body.title,
        price: body.price
    };
    
    // 3. get the database instance
    const db = getDatabaseInstance();

    // 4. get the database collection that we would like to work with
    const collection = db.collection('products-collection');

    // 5. insert into mongo (insertOne)
    const productCreated = await collection.insertOne(product);
    console.log(productCreated);

    // 201 => created status code
    res.status(201).send({message: "Product created."})
});

// DELETE PRODUCT BY ID
productRouter.delete('/products/:id', async (req, res) => {
    try {
        const db = getDatabaseInstance();
        const collection = db.collection("products-collection");

        // Convert the ID string to a MongoDB ObjectId
        const productId = new ObjectId(req.params.id);

        // Delete the product by ID
        const result = await collection.deleteOne({ _id: productId });

        if (result.deletedCount === 0) {
            return res.status(404).send({ message: "Product not found." });
        }

        res.send({ message: "Product deleted successfully." });
    } catch (error) {
        // Handle invalid ObjectId format
        res.status(400).send({ message: "Invalid product ID format." });
    }
});

/**
 * CHALLENGE:
 * - Implement get product by id
 * - Implement delete product by id
 */
export default productRouter;