const mongoose = require("mongoose");

const users = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String
})

const User = mongoose.model('User', users)
module.exports = User