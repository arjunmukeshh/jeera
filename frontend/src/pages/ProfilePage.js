import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/${localStorage.getItem('username')}/details`, {
                    headers: {
                        Authorization: localStorage.getItem('jwtToken'),
                    },
                });

                if (!response.ok) {
                    throw new Error('Error fetching user data');
                }

                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleDeleteAccount = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users/${localStorage.getItem('username')}`, {
                method: 'DELETE',
                headers: {
                    Authorization: localStorage.getItem('jwtToken'),
                },
            });

            if (!response.ok) {
                throw new Error('Error deleting account');
            }

            // Remove the JWT token from local storage
            localStorage.removeItem('jwtToken');

            // Redirect the user to the login page
            window.location.href = '/login';

        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    const handleDeactivateAccount = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users/${localStorage.getItem('username')}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', // Specify JSON content type
                    Authorization: localStorage.getItem('jwtToken'),
                },
                body: JSON.stringify({ active: "0" }), // Convert active to a string
            });

            if (!response.ok) {
                throw new Error('Error deactivating account');
            }

            // Remove the JWT token from local storage
            localStorage.removeItem('jwtToken');

            // Redirect the user to the login page
            window.location.href = '/login';
        } catch (error) {
            console.error('Error deactivating account:', error);
        }
    };


    return (
        <div>
            <h1>Profile Page</h1>
            {userData && (
                <div>
                    <p><strong>Username:</strong> {userData.username}</p>
                    <p><strong>Email:</strong> {userData.email_id}</p>
                    <p><strong>Full Name:</strong> {userData.full_name}</p>
                    <p><strong>Account Status:</strong> {userData.active}</p>
                    <button onClick={handleDeleteAccount}>Delete Account</button>
                    <button onClick={handleDeactivateAccount}>Deactivate Account</button>
                </div>
            )}
        </div>
    );
}

export default Profile;
