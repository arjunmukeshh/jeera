import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    // Remove the JWT token from local storage
    localStorage.removeItem('jwtToken');

    // Redirect the user to the login page
    window.location.href = '/login'; 
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
