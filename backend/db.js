const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ayushkokate1:X2REcxi5w5nRVHm3@cluster0.6ry0cy0.mongodb.net/');

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