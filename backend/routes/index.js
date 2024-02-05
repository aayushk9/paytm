<<<<<<< HEAD
const express = require('express');
const app = express();
const port = 4000;
const userRouter = require('./user');


const router = express.Router();

router.use('/user', userRouter)

router.get('/', (req, res, next) => {
   console.log('Working');
})

module.exports = router;
