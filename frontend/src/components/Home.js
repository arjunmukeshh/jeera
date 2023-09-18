import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

  return (
    <div>
      <h1>Home</h1>
      <Link to="/projects">
        <button>Go to Projects</button>
      </Link>
      {isAdmin && (
        <Link to="/users">
          <button>Go to Users</button>
        </Link>
      )}
      {!isAdmin && (
        <Link to="/profile">
          <button>Go to Profile</button>
        </Link>
      )}
    </div>
  );
}

export default Home;
