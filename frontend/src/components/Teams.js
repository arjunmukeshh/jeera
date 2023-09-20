import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { Button, Container, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from './Header';

const ViewTeams = () => {
    const [teams, setTeams] = useState([]);
    const [isAddTeamPopupOpen, setIsAddTeamPopupOpen] = useState(false);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch('http://localhost:3001/teams');
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
            const response = await fetch('http://localhost:3001/teams', {
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
            const response = await fetch(`http://localhost:3001/teams/${teamId}`, {
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

    const GradientContainer = styled(Container)(
        ({ theme }) => ({
            background: 'linear-gradient(45deg, #000080, #000000)',
            padding: theme.spacing(3),
            color: '#fff',
            minHeight: '100vh', // Make sure the container covers the full viewport height
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        })
    );

    return (
        <>
            <Header />
            <GradientContainer maxWidth="false">
                <h1>All Teams</h1>
                <Button variant="contained"
                    color="primary" // Use the primary color to get the black background
                    style={{
                        backgroundColor: '#000', // Set the background color to black
                        color: '#fff', // Set the font color to white
                        '&:hover': {
                            backgroundColor: '#333', // Darken the background on hover
                        },
                    }} onClick={openAddTeamPopup}>Add Team</Button>
                <ul>
                    {teams.map((team) => (
                        <li key={team.team_id}>
                            <strong>Name:</strong> {team.name}<br />
                            <Link to={`/teams/${team.team_id}/members`}>View Team Members</Link><br />
                            <strong>Description:</strong> {team.description}<br />
                            <Button variant="contained" color="secondary" onClick={() => handleDeleteTeam(team.team_id)}>Delete</Button><br />
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
                        <TextField variant="outlined" fullWidth name="name" />
                        <label>Description:</label>
                        <TextField variant="outlined" fullWidth name="description" />
                        <Button variant="contained" type="submit">Add</Button>
                    </form>
                    {/* When the user submits the form, call the backend route to add the team */}
                </Modal>
            </GradientContainer>
        </>
    );
};

export default ViewTeams;
