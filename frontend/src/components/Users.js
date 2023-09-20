import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import Header from './Header'
const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/users', {
          headers: {
            Authorization: localStorage.getItem('jwtToken'),
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (username) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${username}`, {
        method: 'DELETE',
        headers: {
          Authorization: localStorage.getItem('jwtToken'),
        },
      });

      if (!response.ok) {
        throw new Error('Error deleting user');
      }

      const updatedUsers = users.filter(user => user.username !== username);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleToggleUserStatus = async (username, active) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('jwtToken'),
        },
        body: JSON.stringify({ active: active === 1 ? "0" : "1" }),
      });

      if (!response.ok) {
        throw new Error('Error toggling user status');
      }

      const updatedUsers = users.map(user =>
        user.username === username ? { ...user, active: active === 1 ? 0 : 1 } : user
      );
      setUsers(updatedUsers);
      window.location.reload();
    } catch (error) {
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
                <TableCell>{user.active === 1 ? 'Activated' : 'Deactivated'}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleToggleUserStatus(user.username, user.active)}
                  >
                    {user.active === 1 ? 'Disable' : 'Enable'}
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
