import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false);

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
      <Link to="/projects">
        <Button variant="contained" startIcon={<HomeIcon />} style={buttonStyle}>
          Go to Projects
        </Button>
      </Link>
      {isAdmin && (
        <Link to="/users">
          <Button variant="contained" startIcon={<GroupIcon />} style={buttonStyle}>
            Go to Users
          </Button>
        </Link>
      )}
      {!isAdmin && (
        <Link to="/profile">
          <Button variant="contained" startIcon={<AccountCircleIcon />} style={buttonStyle}>
            Go to Profile
          </Button>
        </Link>
      )}
    </div>
  );
}

export default Home;
