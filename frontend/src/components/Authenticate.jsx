import React from 'react';
import AuthIllustration from '../assets/auth-illustration.svg';
import AuthIllustration2 from '../assets/auth2.svg';

export default function Authenticate() {
    async function handleAuthenticate() {
        try {
            const response = await fetch('http://localhost:8888/authenticate/google', {
                method: 'GET',
            });
            
            // Check if the response is okay
            if (!response.ok) {
                throw new Error('Failed to get the auth URL');
            }

            // Parse the response to get the authentication URL
            const data = await response.json();
            const { authUrl } = data;

            // Redirect the user to the Google OAuth page
            window.location.href = authUrl;
        } catch (error) {
            console.error('Error during authentication:', error);
        }
    }

    return (
        <div className="parent-container">
            <div className='info-container'>
                <img src={AuthIllustration} className='img1'/>
                <img src={AuthIllustration2} className='img2'/>
            </div>
            <div className='login-container'>
                <h1>Mail Storm</h1>
                <p>Effortless Bulk Emails, Personalized for Everyone. In 3 simple steps.</p>
                <ul>
                    <ol>Enter a ulst of emails</ol>
                    <ol>Enter your email body</ol>
                    <ol>Hit Send!</ol>
                </ul>
                <p>Get Started Now!</p>
                <button onClick={handleAuthenticate}>Sign in with Google</button>
            </div>
        </div>
    );
}
