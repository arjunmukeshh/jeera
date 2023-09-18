// src/components/AddTeamPopup.js

import React, { useState } from 'react';

const AddTeamPopup = ({ onClose, onAddTeam }) => {
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');

  const handleAddTeam = () => {
    // Validate inputs (e.g., check if teamName is not empty)
    if (teamName.trim() === '') {
      alert('Team Name cannot be empty');
      return;
    }

    onAddTeam({ name: teamName, description: teamDescription });
    onClose(); // Close the popup after adding team
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Add Team</h2>
        <label>
          Team Name:
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={teamDescription}
            onChange={(e) => setTeamDescription(e.target.value)}
          />
        </label>
        <button onClick={handleAddTeam}>Add Team</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddTeamPopup;
