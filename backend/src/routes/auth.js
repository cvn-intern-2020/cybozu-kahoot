const express = require('express');
const passport = require('passport');
const { ensureAuthenticated } = require('../utils/auth');

const router = express.Router();

router.post('/register_login', (req, res, next) => {
    if (req.isAuthenticated())
        return res.status(403).json({ errors: 'You are already logged in.' });
    passport.authenticate('local', (passportErrors, user, info) => {
        if (passportErrors)
            return res.status(400).json({ errors: passportErrors });
        if (!user) return res.status(400).json({ errors: info.message });
        req.logIn(user, (loginErrors) => {
            if (loginErrors)
                return res.status(400).json({ errors: loginErrors });
            return res
                .status(200)
                .json({ success: `Logged in as ${user.email}` });
        });
    })(req, res, next);
});

router.get('/user', (req, res) => {
    return res.json(req.user);
});

router.get('/logout', ensureAuthenticated, (req, res) => {
    req.logOut();
    return res.json({ message: 'You haved logged out.' });
});

module.exports = router;
