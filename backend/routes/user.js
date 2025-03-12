const express = require("express");
const zod = require("zod");
const bcrypt = require("bcrypt");
const { Account } = require('../models/db');
const { User } = require("../models/db")
const { SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { authMiddleware } = require("../middleware");

router.post("/signup", async (req, res) => {
    try {
        const username = req.body.username;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const password = req.body.password;

        const validateUserData = zod.object({
            username: zod.string().min(2, "username should consist atleast two characters"),
            firstName: zod.string().min(2, "firstname is required"),
            lastName: zod.string().min(2, "lastname is required"),
            password: zod.string().min(8, "password must contain atleast 8 characters")
        })

        const parsingUserData = validateUserData.safeParse(
            {
                username,
                firstName,
                lastName,
                password
            }
        )

        if (!parsingUserData.success) {
            return res.status(411).json({
                msg: "invalid input"
            })
        }

        const usernameExists = await User.findOne({ username })
        if (usernameExists) {
            const comparePasswords = await bcrypt.compare(password, usernameExists.password)
            if (usernameExists && comparePasswords) {
                return res.status(411).json({
                    msg: "please go to login route"
                })
            } else {
                return res.status(411).json({
                    msg: "username already exists please choose other username"
                })
            }
        }

        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new User({
            username: username,
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword
        })
        await user.save()

        const newAccount = new Account({
            userId: user._id,
            balance: 10000
        });
        await newAccount.save()
        
        const token = jwt.sign({ userId: user._id.toString() }, SECRET_KEY)
        console.log(token)  

        return res.status(200).json({
            success: "user created successfully",
            token: token,
            BankBalance: newAccount.balance
        })
    } catch (err) {
        console.error(err)
        return res.json({
            error: err
        })
    }
})

router.post("/login", async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    console.log(req.body)

    const loginBody = zod.object({
        username: zod.string().min(2, "username is required"),
        password: zod.string().min(8, 'password must contain atleast 8 characters')
    })

    const user = {
        username: req.body.username,
        password: req.body.password
    }

    const validate = loginBody.safeParse(user)
    if (!validate.success) {  
        return res.status(400).json({ 
            msg: "Invalid input"  
        });
    }

    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
        const comparePassword = await bcrypt.compare(password, usernameExist.password);
        if (usernameExist && comparePassword) {
            const token = jwt.sign({ userId: usernameExist._id.toString() }, SECRET_KEY)
            console.log(token)
            return res.status(200).json({
                msg: "user logged in",
                token: token
            })
        } else if (password != usernameExist.password) {
            return res.status(400).json({
                msg: "wrong password"
            })
        } else {
            return res.status(400).json({
                msg: "enter correct username or signup"
            })
        }
    }
})

router.put("/update", authMiddleware, (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        console.log(req.body);

        const inputValidate = zod.object({
            username: zod.string().min(2, "username is required"),
            password: zod.string().min(8, "password must contain atleast 8 characters")
        })

        const inputValidation = inputValidate.safeParse({
            username: username,
            password: password
        })

        if (!inputValidation.success) {
            return res.status(411).json({
                msg: "invalid input"
            })
        }

        return res.status(200).json({
            success: true,
            msg: "user info updated successfully"
        })
    } catch (err) {
        console.error(err);
        return res.json({
            msg: "some error occured"
        })
    }
})

router.get("/bulk", authMiddleware, async (req, res) => {
    const search = req.query.search || ""
    console.log(req.query.search);

    let users = []
    if (search.trim()) { 
        users = await User.find({
            username: {
                $regex: search,
                $options: "i"
            }
        });

        console.log(users);
        return res.status(200).json({
            users: users.map(user => ({
                username: user.username,
                id: user._id  
            }))
        });
    }
   
        const sampleUsers = await User.aggregate([{ $sample: { size: 4 } }])
        return res.status(200).json({
            users: sampleUsers.map(user => ({
                username: user.username,
                id: user._id  
            }))
        });    
    
});

module.exports = router    