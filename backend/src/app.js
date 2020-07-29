const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('./passport/setup');

const config = require('./config');

const routes = require('./routes');

const app = express();

mongoose.connect(config.databaseURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

app.listen(config.port, () => console.log(`Server started on ${config.port}`));
