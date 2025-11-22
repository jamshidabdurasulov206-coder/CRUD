const mongoose = require('mongoose');

const todoScheme =  new mongoose.Schema({
    todo: String,
}, { timestamps: true });

module.exports = mongoose.model('todo', todoScheme, 'todos');