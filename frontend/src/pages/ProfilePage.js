import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
const GradientContainer = styled('div')({
    background: 'linear-gradient(45deg, #FF4500, #000000)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
});

const ProfileContent = styled('div')({
    textAlign: 'center',
    padding: '20px',
    border: '2px solid #fff',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    marginBottom: '20px',
});

const ProfileButton = styled(Button)({
    margin: '10px',
    fontSize: '16px',
});

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
            <Header />
            <GradientContainer>
                
                <h1>Profile Page</h1>
                {userData && (
                    <ProfileContent>
                        <Typography variant="h5"><strong>Username:</strong> {userData.username}</Typography>
                        <Typography variant="h5"><strong>Email:</strong> {userData.email_id}</Typography>
                        <Typography variant="h5"><strong>Full Name:</strong> {userData.full_name}</Typography>
                        <Typography variant="h5"><strong>Account Status:</strong> {userData.active}</Typography>
                        <ProfileButton variant="contained" onClick={handleDeleteAccount}>Delete Account</ProfileButton>
                        <ProfileButton variant="contained" onClick={handleDeactivateAccount}>Deactivate Account</ProfileButton>
                    </ProfileContent>
                )}
            </GradientContainer>
        </div>
    );
}

export default Profile;
