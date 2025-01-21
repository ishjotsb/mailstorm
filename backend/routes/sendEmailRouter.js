const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const authMiddleware = require('../middlewares/authMiddleware')

const sendMailController = require('../controllers/sendEmailController');

// router.post('/send-email', authMiddleware, upload.single('attachment'), sendMailController.sendMail);
router.post('/send-email', authMiddleware, sendMailController.sendMail);

module.exports = router;