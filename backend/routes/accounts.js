const express = require("express");
const router = express.Router();
const { Account } = require("../models/db");
const { authMiddleware } = require("../middleware");
const { default: mongoose } = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {

    const account = await Account.findOne({
        userId: req.userId
    })

    return res.status(200).json({
        balance: account.balance
    })
})

router.post("/transfer", authMiddleware, async (req, res) => {

    const session = await mongoose.startSession()
    session.startTransaction();

    const to = req.body.to;
    const amount = req.body.amount;

    if (!amount || isNaN(amount) || amount <= 0) {
        await session.abortTransaction();
        return res.status(400).json({ msg: "Invalid transfer amount" });
    }

    const account = await Account.findOne({ userId: req.userId }).session(session); // the person who is sending money
    if (!account || amount > account.balance) {
        await session.abortTransaction();
        return res.status(400).json({
            msg: "Not enough balance"
        })
    }

    const toAccount = await Account.findOne({ userId: to }).session(session); // person whom we are sending

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            msg: "user does not exist"
        })
    }

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    }).session(session)

    await Account.updateOne({
        userId: to
    }, {
        $inc: {
             balance: amount
        }
    }).session(session)

    await session.commitTransaction();
    return res.status(200).json({
        msg: "transaction successfull"
    })
})

module.exports = router  