const mongoose = require("mongoose");
const URI = process.env.MONGO_URI;

mongoose.connect(URI)   
 .then(() => (console.log(`Database connected`)))
 .catch((err) => (console.error(err)))

const userSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String
})

const accountSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    balance:  {
       type: Number,
       required: true
    }
})

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema)

module.exports = {
    Account, User
}
