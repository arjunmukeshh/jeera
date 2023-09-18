import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
const ViewTeams = () => {
    const [teams, setTeams] = useState([]);
    const [isAddTeamPopupOpen, setIsAddTeamPopupOpen] = useState(false);
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch('http://localhost:3000/teams');
                if (!response.ok) {
                    throw new Error('Error fetching teams');
                }
                const data = await response.json();
                setTeams(data);
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };

        fetchTeams();
    }, []);

    const openAddTeamPopup = () => {
        setIsAddTeamPopupOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const teamData = {
            name: e.target.name.value,
            description: e.target.description.value,
        };

        try {
            const response = await fetch('http://localhost:3000/teams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(teamData),
            });

            if (!response.ok) {
                throw new Error('Error adding team');
            }

            // Team added successfully
            console.log('Team added successfully');
            setIsAddTeamPopupOpen(false); // Close the popup after successful addition
        } catch (error) {
            console.error('Error adding team:', error);
        }
    };

    const handleDeleteTeam = async (teamId) => {
        try {
            const response = await fetch(`http://localhost:3000/teams/${teamId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error deleting team');
            }

            const updatedTeams = teams.filter(team => team.id !== teamId);
            setTeams(updatedTeams);
        } catch (error) {
            console.error('Error deleting team:', error);
        }
    };
    return (
        <div>
            <h1>All Teams</h1>
            <button onClick={openAddTeamPopup}>Add Team</button>
            <ul>
                {teams.map((team) => (
                    <li key={team.team_id}>
                        <strong>Name:</strong> {team.name}<br />
                        <Link to={`/teams/${team.team_id}/members`}>View Team Members</Link><br />
                        <strong>Description:</strong> {team.description}<br />
                        <button onClick={() => handleDeleteTeam(team.team_id)}>Delete</button><br />
                    </li>
                ))}
            </ul>
            <Modal
                isOpen={isAddTeamPopupOpen}
                onRequestClose={() => setIsAddTeamPopupOpen(false)} // Function to close the popup
                ariaHideApp={false} // Disable accessibility warning
            >
                <h2>Add Team</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input type="text" name="name" />
                    <label>Description:</label>
                    <input type="text" name="description" />
                    <button type="submit">Add</button>
                </form>
                {/* When the user submits the form, call the backend route to add the team */}
            </Modal>
        </div>
    );
};

export default ViewTeams;
