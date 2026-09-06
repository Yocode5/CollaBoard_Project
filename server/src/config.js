require('dotenv').config();

const config = {
    port: Number(process.env.PORT),
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET
};

module.exports = config;