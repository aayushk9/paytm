require('dotenv').config();
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
mongoose.connect(uri);

// creating schemas
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true
    },
    firstName:{

    }, 
    lastName: {
        
    }
})

const User = new mongoose.model("User", userSchema);

module.exports =  {
    User
}