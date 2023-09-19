import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import Header from './Header';
const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/user/${formData.username}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      const token = data.Authorization;
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('username', formData.username);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message)
    }
  };

  return (
    <>
    <Header />
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
      
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#000000'}}>
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </div>
        <Button type="submit" variant="contained" sx={{ mt: 2, bgcolor: '#FFA500', color: '#fff' }}>
          Login
        </Button>
      </Box>
      {error && <Typography color="error" sx={{ mt: 2 }}>{`Error: ${error}`}</Typography>}
    </Container>
    </>
  );
};

export default Login;
