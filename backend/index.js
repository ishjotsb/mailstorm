require('dotenv').config();

const express = require('express');
const app = express();
const port = 8888;
const cors = require('cors');

const corsOptions = {
    origin: [process.env.BASE_URL, process.env.API_URL, "https://accounts.google.com", "https://oauth2.googleapis.com"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
};
  
app.use(cors(corsOptions));

app.use(express.json());

const authenticationRouter = require('./routes/authenticationRouter');
const sendEmailRouter = require('./routes/sendEmailRouter');

app.use('/authenticate', authenticationRouter);
app.use('/email', sendEmailRouter);
app.use('/', (req, res) => {
    res.send("<h1>Welcome to MailStorm</h1>")
})

app.listen(port, (req, res) => {
    console.log(`The server is running on port ${port}`);
})
