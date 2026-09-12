require('dotenv').config({
    path: require('path').join(__dirname, '.env.test')
});

const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
});