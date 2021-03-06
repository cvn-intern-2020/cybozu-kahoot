const dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {
    const envFound = dotenv.config();
    if (envFound.error) throw new Error(`Couldn't find .env file.`);
}

module.exports = {
    port: parseInt(process.env.PORT, 10),
    databaseURL: process.env.MONGODB_URI,
    secret: process.env.SECRET,
    clientURL: process.env.CLIENT_URL,
    cookieMaxAge: 86400000,
};
