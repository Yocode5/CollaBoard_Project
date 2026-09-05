const mongoose = require('mongoose');

const app = require('./app');
const config = require('./config');

mongoose.connect(config.mongoUri)
    .then(() => {
        console.log(`Connected to MongoDB successfully`);

        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });