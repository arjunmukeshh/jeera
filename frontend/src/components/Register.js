import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    email_id: '',
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
      const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
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

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </div>
      <div>
        <label>Full Name:</label>
        <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email_id" value={formData.email_id} onChange={handleChange} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
