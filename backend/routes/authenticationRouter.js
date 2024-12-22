const express = require('express');
const router = express.Router();

const authenticationController = require('../controllers/authenticationController');

router.get('/google', authenticationController.googleAuth);

module.exports = router;