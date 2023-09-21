import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import Header from '../Header';
import API_BASE_URL from '../../config/config';

const Users = () => {
  // State to hold the list of users
  const [users, setUsers] = useState([]);

  // Fetch users from the API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetching users from the server
        const response = await fetch(`${API_BASE_URL}/users`, {
          headers: {
            Authorization: localStorage.getItem('jwtToken'),
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching users');
        }

        // Extracting user data from the response
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        // Handling errors when fetching users
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Function to handle deleting a user
  const handleDeleteUser = async (username) => {
    try {
      // Sending a request to delete the user
      const response = await fetch(`${API_BASE_URL}/users/${username}`, {
        method: 'DELETE',
        headers: {
          Authorization: localStorage.getItem('jwtToken'),
        },
      });

      if (!response.ok) {
        throw new Error('Error deleting user');
      }

      // Update the list of users after deletion
      const updatedUsers = users.filter(user => user.username !== username);
      setUsers(updatedUsers);
    } catch (error) {
      // Handling errors when deleting a user
      console.error('Error deleting user:', error);
    }
  };

  // Function to handle toggling user status (enable/disable)
  const handleToggleUserStatus = async (username, active) => {
    try {
      // Sending a request to toggle user status
      const response = await fetch(`${API_BASE_URL}/users/${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('jwtToken'),
        },
        body: JSON.stringify({ active: active == 1 ? "0" : "1" }),
      });

      if (!response.ok) {
        throw new Error('Error toggling user status');
      }

      // Update the user's status in the list of users
      const updatedUsers = users.map(user =>
        user.username === username ? { ...user, active: active == 1 ? 0 : 1 } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      // Handling errors when toggling user status
      console.error('Error toggling user status:', error);
    }
  };

  return (
    <div>
      <Header />
      <h1>All Users</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Enable/Disable</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.user_id}>
                <TableCell>{user.user_id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleDeleteUser(user.username)}
                  >
                    Delete
                  </Button>
                </TableCell>
                <TableCell>{user.active == 1 ? 'Activated' : 'Deactivated'}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleToggleUserStatus(user.username, user.active)}
                  >
                    {user.active == 1 ? 'Disable' : 'Enable'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
