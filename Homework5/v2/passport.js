// // passport.js
// import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';
// import bcrypt from 'bcrypt';
// import { User } from './schemas/user.schema.js';

// passport.use(new LocalStrategy(async (username, password, done) => {
//     try {
//         const user = await User.findOne({ username: username });
//         if (!user) {
//             return done(null, false, { message: 'Incorrect username.' });
//         }
//         const passwordMatch = await bcrypt.compare(password, user.password);
//         if (!passwordMatch) {
//             return done(null, false, { message: 'Incorrect password.' });
//         }
//         return done(null, user);
//     } catch (error) {
//         return done(error);
//     }
// }));

// //remove these session functions later
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await User.findById(id);
//         done(null, user);
//     } catch (error) {
//         done(error);
//     }
// });

// export default passport;


// passport.js
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';  // Use bcryptjs
import { User } from './schemas/user.schema.js';
import dotenv from 'dotenv';
dotenv.config();

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default passport;
