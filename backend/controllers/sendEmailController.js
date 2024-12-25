const { google } = require('googleapis');
const nodemailer = require('nodemailer');

exports.sendMail = async (req, res) => {
    const { emailList, subject, body } = req.body;

    console.log(emailList);

    if (!emailList || !Array.isArray(emailList) || !subject || !body) {
        return res.status(400).json({ error: 'Invalid request. Ensure emailList, subject, and body are provided.' });
    }

    try {
        // Retrieve the tokens from the logged-in user's session or database
        const { accessToken, refreshToken } = req.user.tokens; // Ensure you have middleware to set req.user

        const oAuth2Client = new google.auth.OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            process.env.REDIRECT_URI
        );

        oAuth2Client.setCredentials({
            access_token: accessToken,
            refresh_token: refreshToken
        });

        // Verify the access token
        await oAuth2Client.getAccessToken();

        // Create the nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: req.user.email, // Logged-in user's email
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken,
                accessToken
            }
        });

        // Send emails to each recipient
        const sendEmailPromises = emailList.map(email => {
            return transporter.sendMail({
                from: req.user.email, // Sender address (logged-in user)
                to: email,
                subject: subject,
                text: body,
            });
        });

        await Promise.all(sendEmailPromises);

        res.status(200).json({ message: 'Emails sent successfully!' });
    } catch (error) {
        console.error('Error sending emails:', error);
        res.status(500).json({ error: 'Failed to send emails. Please try again later.' });
    }
};
