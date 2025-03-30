import express from "express";
import fs from "fs";
import bookRoutes from './routes/routes.js';

const server = express();

server.use(express.json());

const PORT = 3001;
const HOST = "localhost";

const logRequest = (req) => {
    const logEntry = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
    };

    console.log(logEntry);

    let logs = [];
    try {
        const data = fs.readFileSync('logs.json', 'utf8');
        logs = JSON.parse(data);
    } catch (err) {
        console.error('Error reading logs.json', err);
    }

    logs.push(logEntry);

    try {
        fs.writeFileSync('logs.json', JSON.stringify(logs, null, 2)); 
    } catch (err) {
        console.error('Error writing to logs.json', err);
    }
};

// Middleware to log requests
server.use((req, res, next) => {
    logRequest(req);
    next();
});

// Use the book routes
server.use('/books', bookRoutes);

server.listen(PORT, HOST, () => {
    console.log(`Server is up and running on: http://${HOST}:${PORT} 🚀🚀🚀`);
});
