const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

// Ensure dotenv is loaded to access environment variables
require('dotenv').config();

exports.googleAuth = async (req, res) => {
    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;
    const REDIRECT_URI = 'http://localhost:8888/authenticate/redirect';
    const oAuth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

    try {
        // Generate auth URL
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/gmail.send',
                'https://mail.google.com/'
            ],
        });

        // Send the URL for the client to redirect to
        res.status(200).json({ authUrl });
    } catch (error) {
        console.error('Error generating auth URL:', error);
        res.status(500).json({ error: 'Failed to generate auth URL' });
    }
};

exports.googleRedirect = async (req, res) => {
    const { code } = req.query; // Extract the 'code' from query params

    if (!code) {
        return res.status(400).json({ error: "Code not found!" });
    }

    // Create OAuth2 client instance in this route
    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;
    const REDIRECT_URI = 'http://localhost:8888/authenticate/redirect';
    const oAuth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

    try {
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);

        console.log(tokens);

        const oauth2 = google.oauth2({ version: 'v2', auth: oAuth2Client });
        const userInfo = await oauth2.userinfo.get();

        const redirectUrl = `http://localhost:5173/home?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}&user_info=${encodeURIComponent(JSON.stringify(userInfo.data))}`;

        res.redirect(redirectUrl);

    } catch (err) {
        console.error('Error exchanging code for token:', err);
        res.status(500).json({ error: 'Failed to exchange code for token' });
    }
};

