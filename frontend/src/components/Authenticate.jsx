import {useState} from 'react';
import AuthIllustration from '../assets/auth-illustration.svg';
import AuthIllustration2 from '../assets/auth2.svg';

export default function Authenticate() {

    async function handleAuthenticate() {
        try {
            const response = await fetch('http://localhost:8888/authenticate/google', {
                method: 'GET',
            });
            
            if (!response.ok) {
                throw new Error('Failed to get the auth URL');
            }

            const data = await response.json();
            const { authUrl } = data;

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
                    <ol>1. Enter a list of emails</ol>
                    <ol>2. Enter your email subject & body</ol>
                    <ol>3. Hit Send!</ol>
                </ul>
                <p>Get Started Now!</p>
                <button onClick={handleAuthenticate}>Sign in with Google</button>
            </div>
        </div>
    );
}
