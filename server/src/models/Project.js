const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],

        startDate: {
            type: String,
            default: ''
        },

        endDate: {
            type: String,
            default: ''
        },

        description: {
            type: String,
            default: '',
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Project', projectSchema);