import React from 'react';
import Header from '../components/Header';

const ErrorPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Header />
      <h1 style={{ color: '#FFA500' }}>Error: Access Denied</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
        Your access has expired or you don't have permission to view this page.
      </p>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        If this isn't supposed to happen, please contact your admin.
      </p>
    </div>
  );
};

export default ErrorPage;
