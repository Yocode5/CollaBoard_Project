const express = require('express');

const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'CollaBoard API is running'
    });
});

module.exports = app;