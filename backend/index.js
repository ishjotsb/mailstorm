require('dotenv').config;

const express = require('express');
const app = express();
const port = 8888;

const authenticationRouter = require('./routes/authenticationRouter');

app.use('/authenticate', authenticationRouter);

app.listen(port, (req, res) => {
    console.log(`The server is running on port ${port}`);
})