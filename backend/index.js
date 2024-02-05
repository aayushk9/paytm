const express = require("express");
const app = express();
const port = 4000;
const rootRouter = require('./routes/index')
const userRouter = require('./routes/user')

const Router = express.Router();
app.use('/api/v1', rootRouter)
app.use('/api/v1', userRouter )


app.listen(port, (req, res) => {
    console.log(`Server is listening on port ${port}`);
})

