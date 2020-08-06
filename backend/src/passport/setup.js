const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { findUserById, findUserByEmail, addUser } = require('../services/user');

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
    const foundUser = await findUserById(id);
    const userInformation = {
        id: id,
        email: foundUser.email,
    };
    done(null, userInformation);
});

// Local Strategy
passport.use(
    new LocalStrategy(
        { usernameField: 'email' },
        async (email, password, done) => {
            // Match user
            const foundUser = await findUserByEmail(email);
            if (!foundUser) {
                // Create new user if none was found
                try {
                    const addedUser = await addUser(email, password);
                    return done(null, addedUser);
                } catch (err) {
                    return done(null, false, { message: err });
                }
            } else {
                // Match password
                const isPasswordMatch = await bcrypt.compare(
                    password,
                    foundUser.password
                );
                if (isPasswordMatch) return done(null, foundUser);
                return done(null, false, { message: 'Wrong password' });
            }
        }
    )
);

module.exports = passport;
