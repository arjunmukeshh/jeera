import React, { useState } from 'react';
import Modal from 'react-modal';
const AddMemberModal = ({ isOpen, onRequestClose, onAddMember, teamId }) => {
    const [username, setUsername] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/teams/${teamId}/add_member`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });

            if (!response.ok) {
                throw new Error('Error adding team member');
            }

            // Call the parent component's callback to update the team members
            onAddMember(username);
            window.location.reload();
            onRequestClose(); // Close the modal after successful addition
        } catch (error) {
            console.error('Error adding team member:', error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={false}
        >
            <h2>Add Team Member</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>
        </Modal>
    );
};

export default AddMemberModal;
