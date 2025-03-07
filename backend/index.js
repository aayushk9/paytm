require('dotenv').config();
const express = require("express");
const { mongoose } = require('mongoose');
const cors = require("cors");
const app = express();
const port = 3000;
const URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors());

const rootRouter = require("./routes/index");


mongoose.connect(URI)   
 .then(() => (console.log(`Database connected`)))
 .catch((err) => (console.error(err)))


app.use("/api/v", rootRouter);

app.listen(port, () => {  
    console.log(`Server is listening on port ${port}`);
});