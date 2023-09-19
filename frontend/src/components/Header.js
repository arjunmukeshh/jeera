import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const CustomAppBar = styled(AppBar)`
  background-color: #000; /* Black background */
`;

const CustomButton = styled(Button)`
  color: #fff !important; /* White text */
  margin-left: auto; /* Align the button to the right */
`;

const Header = () => {
  return (
    <CustomAppBar position="static">
      <Toolbar>
        <div className="logo" style={{ color: '#FFFFFF' }}>Jeera</div> 
      </Toolbar>
    </CustomAppBar>
  );
};

export default Header;
