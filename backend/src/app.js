const express = require('express');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('./passport/setup');
const socket = require('socket.io');

const config = require('./config');
const routes = require('./routes');

const app = express();

mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: config.clientURL,
        credentials: true,
    })
);

app.use(
    session({
        secret: config.secret,
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        cookie: {
            maxAge: config.cookieMaxAge,
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

const server = app.listen(config.port, () =>
    console.log(`Server started on ${config.port}`)
);

const io = socket(server);

require('./game')(io);
