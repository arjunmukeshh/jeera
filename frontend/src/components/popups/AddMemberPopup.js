import React, { useState } from 'react';
import Modal from 'react-modal';
import API_BASE_URL from '../../config/config';

const AddMemberModal = ({ isOpen, onRequestClose, onAddMember, teamId }) => {
    // Use controlled component for the input field
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    // Function to handle adding a team member
    const addTeamMember = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/teams/${teamId}/add_member`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });

            if (!response.ok) {
                throw new Error('Error adding team member');
            }

            const data = await response.json();

            // Call the parent component's callback to update the team members
            onAddMember(data.username);
            onRequestClose(); // Close the modal after successful addition
        } catch (error) {
            setError(error.message)
            // Handle error gracefully (e.g., show a message to the user)
        }
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        addTeamMember();
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
