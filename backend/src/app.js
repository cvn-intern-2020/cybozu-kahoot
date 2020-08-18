const express = require('express');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('./passport/setup');
const socket = require('socket.io');
const path = require('path');

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
    session({
        secret: config.secret,
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        cookie: {
            maxAge: config.cookieMaxAge,
            httpOnly: false,
            secure: false,
        },
    })
);

const corsOptions = {
    origin: true,
    methods: 'GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
};

app.use(passport.initialize());
app.use(passport.session());

app.options('*', cors(corsOptions));
app.use('/api', cors(corsOptions), routes);

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, '../frontend/build/'),
    });
});

const server = app.listen(config.port, () =>
    console.log(`Server started on ${config.port}`)
);

const io = socket(server);

require('./game')(io);
