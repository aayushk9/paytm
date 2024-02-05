const express = require("express");
const app = express();
const port = 4000;

const cors = require('cors');
const { User } = require("./db");
const jwtSecret = require('./config');
const zod = require('zod');
const { use } = require(".");
const Router = express.Router();

// middlewares
app.use(cors());
app.use(express.json());

const userSchema = zod.object({
    username: zod.string(),
    password: zod.string()
})

Router.post('/signup', async(req, res) => {
    const success = userSchema.safeParse(req.body);

    if(!success){
        res.json({
            msg: 'Invalid syntax for username/password'
        })
    }

    const existingUser = await User.findOne({
         username: req.body.userName
    })

    if(existingUser){
        res.json({
            msg: 'User with this username already exists'
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password
    })

    const userId = user._id;

    const token = jwt.sign({
        userId
     }, jwtSecret.JWT_SECRET)
       res.json({
           msg: 'User account created successfully'
     })
})

Router.post('/signin', async(req, res) => {
    const success = userSchema.safeParse(req.body);
    if(!success){
        res.json({
            msg: 'Invalid username'
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(user){
         // send token
         const token = jwt.sign({
            userId: user._id
        }, jwtSecret.JWT_SECRET)
        res.json({
            token: token
        })
        return;
    }
    res.json({
        token: token
    })
})

app.listen(port)

module.exports = router;