const mongoose = require("mongoose");

const users = mongoose.Schema({
    firstName: String,
    lastName: String,
    emal: String
})

const User = mongoose.model('User', {users})
module.exports = User
