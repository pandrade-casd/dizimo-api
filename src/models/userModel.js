const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    admin: {
        type: Boolean,
        default: true
    },
    insert_date: {
        type: Date,
        default: Date.now
    },
});

const user = mongoose.model('user', userSchema);

module.exports = user;
