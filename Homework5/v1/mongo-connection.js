import mongoose from "mongoose"; // external package
import dotenv from 'dotenv';
dotenv.config();

//const NEW_URL = "mongodb+srv://gjorge:qwert_123@cluster0.x196b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const MYURL = process.env.MYURL;

export const mongo_connection = async() => {
    try {
        // connect to mongo
       await mongoose.connect(MYURL, {
            dbName:"recipe-db"
        });
        console.log('Connection with mongo success.')
    } catch (error) {
        // if there is error
        throw new Error('Connection to mongo database failed.')
    }
}