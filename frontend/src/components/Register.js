import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Container,
  Paper,
  Typography,
  Input,
  InputLabel,
} from '@mui/material';
import Header from './Header';
import Papa from 'papaparse';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    email_id: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      console.log(data);
      navigate('/projects');
    } catch (error) {
      console.error(error);
    }
  };

  const changeHandler = (event) => {

    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        results.data.forEach(async (user) => {
          try {
            const response = await fetch('http://localhost:3001/user/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(user)
            });

            if (!response.ok) {
              throw new Error('Registration failed for user: ' + user.username);
            }

            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error(error);
          }
        });
      },
    });
  };

  return (
    <>
      <Header />
      <div style={{
        padding: '20px',
        background: 'linear-gradient(45deg, #000080 30%, #000000 90%)',
      }}>
        <Container maxWidth="sm"  >
          <Paper elevation={3} 
          >
            <Typography variant="h4" align="center" style={{ marginBottom: '20px' }}>
              Register
            </Typography>
            <div style={{
              position: 'relative',
              overflow: 'hidden',
              display: 'inline-block',
              margin: '10px auto',
              marginBottom: '20px',
              width: '100%',
            }}>

              <InputLabel style={{
                fontSize: '16px',
                padding: '10px 20px',
                backgroundColor: '#FFA500',
                color: '#fff',
                borderRadius: '4px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                position: 'relative',  // Add relative positioning to label
                zIndex: 1,  // Ensure label is on top
              }}>Choose CSV File<Input
                  type="file"
                  name="file"
                  accept=".csv"
                  onChange={changeHandler}
                  style={{
                    fontSize: '16px',  // Adjust font size to make it visible
                    position: 'absolute',
                    opacity: 1,  // Set opacity to 1 to make it fully visible
                    cursor: 'pointer',
                    right: 0
                  }}
                /></InputLabel>
            </div>

            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                label="Username"
                fullWidth
                name="username"
                value={formData.username}
                onChange={handleChange}
                style={{ marginBottom: '15px' }}
              />
              <TextField
                variant="outlined"
                label="Full Name"
                fullWidth
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                style={{ marginBottom: '15px' }}
              />
              <TextField
                variant="outlined"
                label="Email"
                fullWidth
                type="email"
                name="email_id"
                value={formData.email_id}
                onChange={handleChange}
                style={{ marginBottom: '15px' }}
              />
              <TextField
                variant="outlined"
                label="Password"
                fullWidth
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={{ marginBottom: '20px' }}
              />
              <Button
                variant="contained"
                type="submit"
                fullWidth
                style={{
                  backgroundColor: '#000',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#333',
                  },
                }}
              >
                Register
              </Button>
            </form>
          </Paper>
        </Container>
      </div>
    </>
  );
};

export default Register;
