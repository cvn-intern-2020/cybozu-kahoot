const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) next();
  else res.status(401).json({ errors: 'You are not logged in.' });
};

module.exports = { ensureAuthenticated };
