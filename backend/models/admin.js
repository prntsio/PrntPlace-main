const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    // name: {
    //     type: String,
    //     required: true,
    // },
    email: {
        type: String,
        required: true,
    },
    encryptedPassword: {
        type: String,
        required: true,
    },
    // role: { type: String, enum: ['admin', 'restricted'], required: true },
});

module.exports = mongoose.model('Admin', adminSchema);
