require('dotenv').config()
const express = require("express");
const app = express();
const port = 3000;
const User = require('./models/db');
const { mongoose } = require('mongoose');
const cors = require("cors")
const rootRouter = require("./routes/index")
const URI = process.env.MONGO_URI 
const JWT = require("./config")

app.use(express.json());
app.use(cors())
const router = express.Router();

mongoose.connect(URI)   
 .then(() => (console.log(`Database connected`)))
 .catch((err) => (console.error(err)))

app.use("/", rootRouter)

app.listen(port, () => {  
    console.log(`Server is listening on port ${port}`);
})