const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortCode: {
        type: String,
        required: true,
        unique: true,
    },
    visits: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

UrlSchema.index({ shortCode: 1 });

module.exports = mongoose.model('Url', UrlSchema);