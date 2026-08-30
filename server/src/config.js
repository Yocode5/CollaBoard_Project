require('dotenv').config();

const config = {
    port: Number(process.env.PORT) || 4000
};

module.exports = config;