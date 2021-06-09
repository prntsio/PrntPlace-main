const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: String,
    username: String,
    about: String,
});

module.exports = mongoose.model('User', userSchema);
