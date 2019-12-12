const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    _id: String,
    title: String,
    description: String,
    body: String,
    favorites: [{ type: String }],
    favoriteCount: { type: Number, default: 0 },
    author: String,
}, { timestamps: true });

module.exports = ArticleSchema;