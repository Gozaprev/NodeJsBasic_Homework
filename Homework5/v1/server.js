import express from "express";
import { mongo_connection } from "./mongo-connection.js";
import recipesRouter from "./routes/recipes.router.js";
import chefsRouter from "./routes/chefs.router.js";

const server = express();
server.use(express.json());

server.use(recipesRouter);
server.use(chefsRouter);


//Different way to listen the server

// server.listen(3001, "localhost", async () => {
//     console.log('Server is up and running');
//     await mongo_connection()
// });

const PORT = 3001;
const HOST = "localhost";

server.listen(PORT, HOST, async () => {
    console.log(`Server is up and running on: http://${HOST}:${PORT} 🚀🚀🚀`);
    await mongo_connection();
});