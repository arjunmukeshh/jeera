import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import '../css/LandingPage.css';

const CustomButton = styled(Button)`
  background-color: #000 !important; /* Black background */
  color: #fff !important; /* White text */
`;

const LandingPage = () => {
  return (
    <div className="gradientBackground">
      <Header />
      <div className="container">
        <div className="content">
          <h1 className="title">Welcome to Jeera👋</h1>
          <p className="description">
            A Comprehensive Planning and Access Management Tool
          </p>
          <CustomButton variant="contained" component={Link} to="/login" className="button">
            Get Started
          </CustomButton>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
