import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    // Remove the JWT token from local storage
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user_id')
    localStorage.removeItem('isAdmin')
    // Redirect the user to the login page
    window.location.href = '/login'; 
  };

  return (
    <button className='right' onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
