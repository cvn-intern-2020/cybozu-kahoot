const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/register_login', (req, res, next) => {
  passport.authenticate('local', (passportErrors, user, info) => {
    if (passportErrors) return res.status(400).json({ errors: passportErrors });
    if (!user) return res.status(400).json({ errors: info.message });
    req.logIn(user, (loginErrors) => {
      if (loginErrors) return res.status(400).json({ errors: loginErrors });
      return res.status(200).json({ success: `Logged in as ${user.email}` });
    });
  })(req, res, next);
});

module.exports = router;
