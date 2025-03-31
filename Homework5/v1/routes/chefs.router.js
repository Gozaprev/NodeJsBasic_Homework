import express from "express";
import { chefMongoModel } from "../schemas/chef.schema.js";

const chefRouter = express.Router();

// GET ALL chefs
chefRouter.get("/chefs", async (req, res) => {
    const chefs = await chefMongoModel.find();

    res.send(chefs)
});

// Create a route that handles: GET chef BY ID
// NOTE: The method that you should use from chefMongoModel is findById()

// GET chef BY ID
chefRouter.get("/chefs/:id", async (req, res) => {
    const chefID = req.params.id;

    const chef = await chefMongoModel.findById(chefID);
    if (!chef) {
        return res.status(404).send({ message: `Chef with id: ${chefID} was not found.` })
    }
    res.send(chef)
});


// CREATE chef
chefRouter.post('/chefs', async (req, res) => {
    const body = req.body;

    const chefBody = {
        name: body.name,
        experience: body.experience,
        specialty: body.specialty

    };

    try {
        // Creating a chef document that is about to get saved into mongo
        // the values provided must respect the chef schema
        const chefDocument = new chefMongoModel(chefBody);

        // Going to store the chef document(object) into mongo
        await chefDocument.save()

        res.status(201).send({ message: 'Created' })
    } catch (error) {
        console.error(error)
    }

});

// DELETE chef
chefRouter.delete("/chefs/:id", async (req, res) => {
    const chefID = req.params.id;

    // findByIdAndDelete will delete the chef with matching ID, but if it is not found
    // it will return NULL
    const response = await chefMongoModel.findByIdAndDelete(chefID);
    console.log(response)

    if (!response) {
        return res.status(404).send({ message: `chef with id: ${chefID} was not found.` })
    }

    res.send({ message: "Delete success" })
});



export default chefRouter;