const mongoose = require('mongoose');

// connects tasks to users
const taskSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        title: {
            type: String,
            required: true
        },

        description: {
            type: String
        },

        deadline: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            default: 'Pending'
        },
        reminderSent: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Task', taskSchema);