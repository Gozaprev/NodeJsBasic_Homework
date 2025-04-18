import mongoose from "mongoose";

const { Schema } = mongoose

/**
 * This schema represents the structure/shape of the object/document
 * that we are going to store into mongo. 
 * And we must RESPECT the schema, if not, mongo will throw an error.
 */
const recipeSchema = new Schema({
    recipeName: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    cookingDuration: { 
        type: String, 
        required: true 
    },
    ingredients: { 
        type: [String], 
        required: true 
    },
    servings: { 
        type: Number, 
        required: true 
    },
    difficulty: { 
        type: String, 
        required: true 
    },
    cuisine: { 
        type: String, 
        required: true 
    },
    chef: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Chef' 
    }
});

export const recipeMongoModel = mongoose.model(
    "Recipe", // name of the model
    recipeSchema,  // schema (represents the shape of the objects)
    "recipes" // collection name that we would like to iteract with
) 