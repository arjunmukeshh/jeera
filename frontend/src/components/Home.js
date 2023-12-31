import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import API_BASE_URL from '../config/config';
import Logout from './Logout';

const Home = () => {
  // State to track if the user is an admin
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Fetch user data and determine if the user is an admin
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users/${localStorage.getItem('username')}/details`, {
          headers: {
            Authorization: localStorage.getItem('jwtToken'),
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching user data');
        }

        const data = await response.json();
        setIsAdmin(data.isAdmin);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const containerStyle = {
    textAlign: 'center',
    marginTop: '50px',
  };

  const buttonStyle = {
    margin: '10px',
    background: '#000',
    color: '#fff',
  };

  return (
    <div style={containerStyle}>
      <h1>Home</h1>
      {/* Link to Projects */}
      <Link to="/projects">
        <Button variant="contained" startIcon={<HomeIcon />} style={buttonStyle}>
          Go to Projects
        </Button>
      </Link>

      {/* Conditional link based on whether the user is an admin */}
      {isAdmin ? (
        <Link to="/users">
          <Button variant="contained" startIcon={<GroupIcon />} style={buttonStyle}>
            Go to Users
          </Button>
        </Link>
      ) : (
        <Link to="/profile">
          <Button variant="contained" startIcon={<AccountCircleIcon />} style={buttonStyle}>
            Go to Profile
          </Button>
        </Link>
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
      <Logout />
    </div>
  );
}

export default Home;
