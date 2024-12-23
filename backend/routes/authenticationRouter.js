const express = require('express');
const router = express.Router();

const authenticationController = require('../controllers/authenticationController');

router.get('/google', authenticationController.googleAuth);
router.get('/redirect', authenticationController.googleRedirect);

module.exports = router;