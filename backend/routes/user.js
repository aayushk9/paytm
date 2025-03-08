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
            password: zod.string().
                min(8, "password must contain atleast 8 characters").
                regex(/[A-Z]/, "password must contain atleast one capital letter").
                regex(/[0-9]/, "password must contain atleast one number").
                regex(/[\W_]/, "password must contain atleast one special character")
        })

        const parsingUserData = validateUserData.safeParse(
            {
                username: username,
                firstName: firstName,
                lastName: lastName,
                password: password
            }
        )

        if (!parsingUserData) {
            return res.status(411).json({
                error: "invalid input"

            })
        }

        const usernameExists = await User.findOne({ username })
        if (usernameExists) {
            const comparePasswords = await bcrypt.compare(password, usernameExists.password)
            if (comparePasswords) {
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
        const userId = user._id;

        await Account.create({
            userId: userId,
            balance: 10000
        })

        //await account.save()
        await user.save()
        const token = jwt.sign({ userId }, SECRET_KEY)
        return res.status(200).json({
            msg: "user created successfully",
            token: token,
            BankBalance: account.balance
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

    const loginBody = zod.object({
        username: zod.string().min(2, "username is required"),
        password: zod.string().
            min(8, "password must contain atleast 8 characters").
            regex(/[A-Z]/, "password must contain atleast one capital letter").
            regex(/[0-9]/, "password must contain atleast one number").
            regex(/[\W_]/, "password must contain atleast one special character")
    })
    const user = {
        username: req.body.username,
        password: req.body.password
    }
    const userId = user._id

    const validate = loginBody.safeParse(user)
    if (!validate) {
        return res.status(411).json({
            error: "invalid input"
        })
    }

    const token = jwt.sign({ userId }, SECRET_KEY)
    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
        const comparePassword = await bcrypt.compare(password, usernameExist.password);
        if (comparePassword) {
            return res.status(200).json({
                msg: "user logged in",
                token: token
            })
        } else {
            return res.status(411).json({
                msg: "wrong password"
            })
        }
    }
})

router.put("/", authMiddleware, (req, res) => {
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const password = req.body.password;

        const inputValidate = zod.object({
            firstName: zod.string().min(2, "firstname is required"),
            lastName: zod.string().min(2, "lastname is required"),
            password: zod.string().
                min(8, "password must contain atleast 8 characters").
                regex(/[A-Z]/, "password must contain atleast one capital letter").
                regex(/[0-9]/, "password mus contain atleast one number").
                regex(/[\W_]/, "password must contain atleast one special character")
        })

        const inputValidation = inputValidate.safeParse({
            firstName: firstName,
            lastName: lastName,
            password: password
        })

        if (!inputValidation) {
            return res.status(411).json({
                msg: "invalid input"
            })
        }

        return res.status(200).json({
            msg: "user info updates successfully"
        })
    } catch (err) {
        console.error(err);
        return res.json({
            error: "some error occured"
        })
    }
})

router.get("/bulk", async (req, res) => {
    const search = req.query.search || ""

    const users = await User.find({
        $or: [
            {
                firstName: {
                    $regex: search,
                    $options: "i"
                }
            }
        ]
    })

    res.status(200).json({
        users: users.map(user => ({
            firstName: user.firstName,
            id: users._id
        }))
    })
})

module.exports = router    