// // auth.router.js
// import express from 'express';
// import passport from 'passport';
// import jwt from 'jsonwebtoken';
// import { User } from '../schemas/user.schema.js';

// const router = express.Router();

// router.post('/register', async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const newUser = new User({ username, password });
//         await newUser.save();
//         res.status(201).send({ message: 'User registered successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: 'Error registering user' });
//     }
// });

// router.post('/login', (req, res, next) => {
//     passport.authenticate('local', { session: false }, (err, user, info) => {
//         if (err || !user) {
//             return res.status(400).json({
//                 message: info ? info.message : 'Login failed',
//                 user: user
//             });
//         }
//         req.login(user, { session: false }, (err) => {
//             if (err) {
//                 res.send(err);
//             }
//             // generate a signed son web token with the contents of the user object and return it in the response
//             const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret');  //Use a strong secret key
//             return res.json({ user, token });
//         });
//     })(req, res, next);
// });

// router.get('/logout', (req, res) => {
//     req.logout(function(err) {
//         if (err) { return next(err); }
//         res.send({ message: 'Logged out successfully' });
//     });
// });

// export default router;


import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { User } from '../schemas/user.schema.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send({ message: 'Username and password are required' });
        }

        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).send({ message: 'Validation error', errors: error.errors });
        }
        res.status(500).send({ message: 'Error registering user' });
    }
});

router.post('/login', passport.authenticate('local', { session: true }), (req, res) => {
    // If this function is reached, authentication was successful.
    // `req.user` contains the authenticated user.
    const token = jwt.sign({ id: req.user.id, username: req.user.username }, 'your_jwt_secret');
    res.json({ user: req.user, token: token });
});

router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.send({ message: 'Logged out successfully' });
    });
});

export default router;
