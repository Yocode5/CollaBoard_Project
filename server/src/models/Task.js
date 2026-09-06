const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ['To Do', 'In Progress', 'Completed'],
        default: 'To Do'
    },
    assignee: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);