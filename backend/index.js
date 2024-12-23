require('dotenv').config();

const express = require('express');
const app = express();
const port = 8888;
const cors = require('cors');

const corsOptions = {
    origin: [process.env.BASE_URL, "https://accounts.google.com"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
};
  
app.use(cors(corsOptions));


const authenticationRouter = require('./routes/authenticationRouter');

app.use('/authenticate', authenticationRouter);

app.listen(port, (req, res) => {
    console.log(`The server is running on port ${port}`);
})