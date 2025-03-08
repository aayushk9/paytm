require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const rootRouter = require("./routes/index");

app.use("/api/v", rootRouter);

app.listen(port, () => {  
    console.log(`Server is listening on port ${port}`);
});