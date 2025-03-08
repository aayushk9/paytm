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

    const account = await Account.findOne({ userId: req.userId }).session(session);
    if (!account || amount > Account.balance) {
        await session.abortTransaction();
        return res.status(400).json({
            msg: "Not enough balance"
        })
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        res.status(400).json({
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
        $inc: amount
    }).session(session)

    await session.commitTransaction();
    res.status(200).json({
        msg: "transaction successfull"
    })
})

module.exports = router 