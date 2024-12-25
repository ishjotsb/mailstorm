const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')

const sendMailController = require('../controllers/sendEmailController');

router.post('/send-email', authMiddleware, sendMailController.sendMail);

module.exports = router;