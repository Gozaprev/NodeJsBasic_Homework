// import express from "express";
// import { mongo_connection } from "./mongo-connection.js";
// import recipesRouter from "./routes/recipes.router.js";
// import chefsRouter from "./routes/chefs.router.js";

// import passport from 'passport';
// import session from 'express-session';
// import authRouter from "./routes/auth.router.js";
// import dotenv from 'dotenv';
// dotenv.config();



// const server = express();

// // Configure express-session (BEFORE Passport!)
// server.use(session({
//     secret: 'your-secret-key',  // Replace with a strong, random key (ENV VAR!)
//     resave: false,
//     saveUninitialized: false
// }));

// server.use(express.json());

// // Initialize Passport and session middleware (AFTER session!)
// server.use(passport.initialize());
// server.use(passport.session());

// server.use(authRouter);
// server.use(recipesRouter);
// server.use(chefsRouter);

// // server.use(express.json());
// // server.use(passport.initialize());
// // server.use(passport.session());

// // server.use(recipesRouter);
// // server.use(chefsRouter);
// // server.use(authRouter);

// // server.use(session({
// //     secret: process.env.SESSION_SECRET, 
// //     resave: false,
// //     saveUninitialized: false
// // }));

// // server.use(session({
// //     secret: 'your-secret-key',
// //     resave: false,
// //     saveUninitialized: false
// // }));
// // server.use(passport.initialize());
// // server.use(passport.session());


// //Different way to listen the server

// // server.listen(3001, "localhost", async () => {
// //     console.log('Server is up and running');
// //     await mongo_connection()
// // });

// const PORT = 3001;
// const HOST = "localhost";

// server.listen(PORT, HOST, async () => {
//     console.log(`Server is up and running on: http://${HOST}:${PORT} 🚀🚀🚀`);
//     await mongo_connection();
// });

import express from "express";
import session from 'express-session';
import passport from 'passport';
import { mongo_connection } from "./mongo-connection.js";
import recipesRouter from "./routes/recipes.router.js";
import chefsRouter from "./routes/chefs.router.js";
import authRouter from "./routes/auth.router.js";
import './passport.js'; // Import the passport configuration file

const server = express();

// Configure express-session middleware (BEFORE Passport)
server.use(session({
    secret: 'your-secret-key', // Replace with a strong, random key
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport middleware
server.use(passport.initialize());
server.use(passport.session());

server.use(express.json());
server.use(authRouter);
server.use(recipesRouter);
server.use(chefsRouter);

const PORT = 3001;
const HOST = "localhost";

server.listen(PORT, HOST, async () => {
    console.log(`Server is up and running on: http://${HOST}:${PORT} 🚀🚀🚀`);
    try {
        await mongo_connection();
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
});
