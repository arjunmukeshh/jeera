import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    // Remove the JWT token from local storage
    localStorage.removeItem('jwtToken');

    // Redirect the user to the login page (assuming it's available)
    window.location.href = '/login'; // You can replace this with your route
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
