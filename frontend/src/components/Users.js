import React, { useState, useEffect } from 'react';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/users', {
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
            const response = await fetch(`http://localhost:3000/users/${username}`, {
                method: 'DELETE',
                headers: {
                    Authorization: localStorage.getItem('jwtToken'),
                },
            });

            if (!response.ok) {
                throw new Error('Error deleting user');
            }

            // Update users list after deleting user
            const updatedUsers = users.filter(user => user.username !== username);
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleToggleUserStatus = async (username, active) => {
        try {
            const response = await fetch(`http://localhost:3000/users/${username}`, {
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

            // Update users list after toggling user status
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
            <h1>All Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Action</th> 
                        <th>Status</th>
                        <th>Enable/Disable</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.user_id}>
                            <td>{user.user_id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleDeleteUser(user.username)}>
                                    Delete
                                </button>
                            </td>
                            <td>{user.active == 1 ? 'Activated' : 'Deactivated'}</td>
                            <td>
                                <button onClick={() => handleToggleUserStatus(user.username, user.active)}>
                                    {user.active == 1 ? 'Disable' : 'Enable'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
