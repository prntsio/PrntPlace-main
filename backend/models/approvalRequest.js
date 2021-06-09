const mongoose = require('mongoose');

const RequestSchema = mongoose.Schema({
    isApproved: {
        type: Boolean,
        default: false,
    },
    id: {
        type: String,
        required: true,
    },
    links: {
        twitter: String,
        instagram: String,
        email: String,
        website: String,
        other: String,
    },
    description: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('ApprovalRequest', RequestSchema);
