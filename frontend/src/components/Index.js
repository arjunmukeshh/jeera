import React from 'react';
import { Link } from 'react-router-dom';

function Index() {
  return (
    <div>
      <h1>Login or Register?</h1>
      <Link to="/login">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
      </Link>
      <Link to="/register">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Register
        </button>
      </Link>
    </div>
  );
}

export default Index;
