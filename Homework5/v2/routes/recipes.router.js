import express from "express";
import { recipeMongoModel } from "../schemas/recipe.schema.js";
import { authenticateJWT } from "../middleware.js";

const recipeRouter = express.Router();

// GET ALL recipes without token
// recipeRouter.get("/recipes", async (req, res) => {
    
//     const recipes = await recipeMongoModel.find().populate('chef');

//     res.send(recipes)
// });

// GET ALL recipes with token

recipeRouter.get("/recipes", authenticateJWT, async (req, res) => {
    const recipes = await recipeMongoModel.find().populate('chef');
    res.send(recipes);
});

// Create a route that handles: GET recipe BY ID
// NOTE: The method that you should use from recipeMongoModel is findById()

// GET recipe BY ID
recipeRouter.get("/recipes/:id", authenticateJWT, async (req, res) => {
    const recipeID = req.params.id;

    const recipe = await recipeMongoModel.findById(recipeID).populate('chef');
    if (!recipe) {
        return res.status(404).send({ message: `Recipe with id: ${recipeID} was not found.` })
    }
    res.send(recipe)
});


// CREATE recipe
recipeRouter.post('/recipes', authenticateJWT, async (req, res) => {
    const body = req.body;

    const recipeBody = {
        recipeName: body.recipeName,
        description: body.description,
        cookingDuration: body.cookingDuration,
        ingredients: body.ingredients,
        servings: body.servings,
        difficulty: body.difficulty,
        cuisine: body.cuisine,
        chef: body.chef

    };

    try {
        // Creating a recipe document that is about to get saved into mongo
        // the values provided must respect the recipe schema
        const recipeDocument = new recipeMongoModel(recipeBody);
 
        // Going to store the recipe document(object) into mongo
        await recipeDocument.save()

        res.status(201).send({message: 'Created'})
    } catch (error) {
        console.error(error)
    }

});

// DELETE recipe
recipeRouter.delete("/recipes/:id", authenticateJWT, async (req, res) => {
    const recipeID = req.params.id;

    // findByIdAndDelete will delete the recipe with matching ID, but if it is not found
    // it will return NULL
   const response = await recipeMongoModel.findByIdAndDelete(recipeID);
   console.log(response)

   if(!response){
    return res.status(404).send({message: `recipe with id: ${recipeID} was not found.`})
   }

   res.send({message: "Delete success"})
});

// UPDATE recipe with patch

recipeRouter.patch('/recipes/:id', authenticateJWT, async (req, res) => {
    try {
      const recipe = await recipeMongoModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      ).populate('chef');
      if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
      res.json(recipe);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// UPDATE recipe with put
recipeRouter.put('/recipes/:id', authenticateJWT, async (req, res) => {
    const recipeID = req.params.id;

    const body = req.body;

    const recipeToUpdate = {
        recipeName: body.recipeName,
        description: body.description,
        cookingDuration: body.cookingDuration,
        ingredients: body.ingredients,
        servings: body.servings,
        difficulty: body.difficulty,
        cuisine: body.cuisine,
        chef: body.chef
    }

    await recipeMongoModel.findByIdAndUpdate(recipeID, recipeToUpdate).populate('chef');;


    res.send({message: 'Update success'})
});



export default recipeRouter;