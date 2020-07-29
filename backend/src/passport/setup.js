const bcrypt = require('bcryptjs');
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  const foundUser = await User.findById(id).exec();
  done(null, foundUser);
});

const addUser = async (email, password) => {
  const newUser = new User({ email, password });
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(newUser.password, salt);
  newUser.password = hash;
  const addedUser = await newUser.save();
  return addedUser;
};

// Local Strategy
passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      // Match user
      const foundUser = await User.findOne({ email });
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
