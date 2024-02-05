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

<<<<<<< HEAD
=======
// get request for signup page
app.get('/signup', (req, res) => {
  res.send('signup')
})

// post request for signup page
app.post('/signup', (req, res) => {
    // signing up
});

// get request for signin page
app.get('/signin', (req, res) => {
    res.send(`signin`)
})

// post request for signin page 
app.post('/signin', (req, res) => {

})

// update data
app.get('/settings', (req, res) => {
    res.send('update profile')
})

app.put('/settings', (req, res) => {
    // perform operation
})

app.listen(3000, (req, res) => {
    console.log(`Server is listening on port 3000`);
})


>>>>>>> cf2a14d7d7e2ccd8e5c729ad528c6667bdf641d2
