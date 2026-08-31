const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.get('/', (req, res) => {
    res.json({
        message: 'CollaBoard API is running'
    });
});

module.exports = app;