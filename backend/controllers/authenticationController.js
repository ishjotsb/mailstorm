const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

// require('dotenv').config()

exports.googleAuth = async (req, res) => {

    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;
    const REDIRECT_URI = 'http://localhost:5173/home';
    const oAuth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    
    // console.log(CLIENT_ID, CLIENT_SECRET)

  try {
    
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
    });

    res.status(200).json({ authUrl });
  } catch (error) {
    console.error('Error generating auth URL:', error);
    res.status(500).json({ error: 'Failed to generate auth URL' });
  }
};
