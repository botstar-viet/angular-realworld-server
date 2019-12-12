const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: String,
    username: String,
    email: String,
    password: String,
    articles: [{ type: String }],
    favorites: [{ type: String }],
}, { timestamps: true });

module.exports = UserSchema;