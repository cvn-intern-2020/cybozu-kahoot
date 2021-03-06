const express = require('express');
const passport = require('passport');
const { ensureAuthenticated } = require('../utils/auth');
const { changePassword } = require('../services/user');

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

router.post('/change_password', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;

    try {
        const result = await changePassword(
            userId,
            req.body.oldPassword,
            req.body.newPassword
        );
        if (result.errors) return res.status(400).json(result);

        return res.status(200).json(result);
    } catch (err) {
        return { errors: err.message };
    }
});

router.get('/user', (req, res) => {
    if (req.user) return res.json({ email: req.user.email });
    return res.json(undefined);
});

router.get('/logout', ensureAuthenticated, (req, res) => {
    req.logOut();
    return res.json({ message: 'You haved logged out.' });
});

module.exports = router;
