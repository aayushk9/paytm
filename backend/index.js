const express = require("express");
const app = express();
const { db } = require("./db");

app.use(express.json());

// home route
app.get('/', (req, res) => {
    res.send(`Paytm`)
})

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


