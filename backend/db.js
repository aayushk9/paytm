require('dotenv').config();
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
mongoose.connect(uri);

const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

const user = new mongoose.model('user', userSchema)

module.exports ={
    user
}

