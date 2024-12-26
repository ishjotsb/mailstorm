const {google} = require('googleapis');
const { oauth2 } = require('googleapis/build/src/apis/oauth2');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    
    const token = authHeader.split(' ')[1].trim();
    console.log(token);

    if(!token) {
        return res.status(401).json({ error: 'Authorization token is missing.' });
    }

    try {
        // const oAuth2Client = new google.auth.OAuth2(
        //     process.env.CLIENT_ID,
        //     process.env.CLIENT_SECRET,
        //     'http://localhost:8888/authenticate/redirect'
        // )

        // oAuth2Client.setCredentials({access_token: token});

        // const tokenInfo = await oAuth2Client.getTokenInfo(token);
        // console.log('Token Info:', tokenInfo);

        // const oauth2 = google.oauth2({ version: 'v2', auth: oAuth2Client });
        // const { data: userInfo } = await oauth2.userinfo.get();

        // if (!userInfo || !userInfo.email) {
        //     throw new Error('Failed to fetch user information.');
        // }

        // req.user = {
        //     email: userInfo.email,
        //     tokens: {
        //         accessToken: token,
        //     },
        // };

        // next();

        const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?access_token=${token}`);
        const data = await response.json();
        console.log(data);

        if(!data) {
            throw new Error('Failed to fetch user information');
        }

        req.user = {
            email: data.email,
            tokens: {
                accessToken: token
            }
        }

        next();

    }
    catch(err) {
        console.error('Authorization error:', err);
        res.status(401).json({ error: 'Invalid or expired token. Please log in again.' });
    }
}