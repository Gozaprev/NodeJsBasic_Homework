import mongoose from "mongoose";

const { Schema } = mongoose

const chefSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    experience: { 
        type: String, 
        required: true 
    },
    specialty: { 
        type: String, 
        required: true 
    }
});

export const chefMongoModel = mongoose.model(
    "Chef", // name of the model
    chefSchema,  // schema (represents the shape of the objects)
    "chefs" // collection name that we would like to iteract with
) 