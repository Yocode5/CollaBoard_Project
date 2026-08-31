const express = require('express');

const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'CollaBoard API is running'
    });
});

module.exports = app;