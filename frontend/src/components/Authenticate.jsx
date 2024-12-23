import React from 'react';

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
        <div>
            <button onClick={handleAuthenticate}>Sign in with Google</button>
        </div>
    );
}
