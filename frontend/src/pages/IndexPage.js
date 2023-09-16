import React from 'react';
import { Link } from 'react-router-dom';

const IndexPage = () => {
  return (
    <div>
      <h1>Login or Register?</h1>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default IndexPage;
