import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Custom styled AppBar with black background
const CustomAppBar = styled(AppBar)`
  background-color: #000;
`;

// Custom styled Button with white text and auto margin
const CustomButton = styled(Button)`
  color: #fff !important;
  margin-left: auto;
`;

const Header = () => {
  return (
    <CustomAppBar position="static">
      <Toolbar>
        <Link to="/dashboard" style={{ textDecoration: 'none', color: '#FFFFFF' }}>
          <div className="logo">Jeera</div>
        </Link>
      </Toolbar>
    </CustomAppBar>
  );
};

export default Header;
