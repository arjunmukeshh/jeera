import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { Button, Container, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from '../Header';
import API_BASE_URL from '../../config/config';

const ViewTeams = () => {
    // State for storing teams and controlling add team modal
    const [teams, setTeams] = useState([]);
    const [isAddTeamPopupOpen, setIsAddTeamPopupOpen] = useState(false);

    useEffect(() => {
        // Fetch teams when component mounts
        const fetchTeams = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/teams`);
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

        // Extract team data from form
        const teamData = {
            name: e.target.name.value,
            description: e.target.description.value,
        };

        try {
            // Send a request to add the team
            const response = await fetch(`${API_BASE_URL}/teams`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(teamData),
            });

            if (!response.ok) {
                throw new Error('Error adding team');
            }

            // Team added successfully, update state and close modal
            const addedTeam = await response.json();
            setTeams([...teams, addedTeam]);
            setIsAddTeamPopupOpen(false);
        } catch (error) {
            console.error('Error adding team:', error);
        }
    };

    const handleDeleteTeam = async (teamId) => {
        try {
            // Send a request to delete the team
            const response = await fetch(`${API_BASE_URL}/teams/${teamId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error deleting team');
            }

            // Update state after successful deletion
            const updatedTeams = teams.filter(team => team.team_id !== teamId);
            setTeams(updatedTeams);
        } catch (error) {
            console.error('Error deleting team:', error);
        }
    };

    // Define a styled component for the gradient container
    const GradientContainer = styled(Container)(
        ({ theme }) => ({
            background: 'linear-gradient(45deg, #000080, #000000)',
            padding: theme.spacing(3),
            color: '#fff',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        })
    );

    return (
        <>
            {/* Header Component */}
            <Header />

            {/* Container with gradient background */}
            <GradientContainer maxWidth="false">
                {/* Heading */}
                <h1>All Teams</h1>

                {/* Button to open Add Team modal */}
                <Button
                    variant="contained"
                    color="primary"
                    style={{
                        backgroundColor: '#000',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: '#333',
                        },
                    }}
                    onClick={openAddTeamPopup}
                >
                    Add Team
                </Button>

                {/* List of teams */}
                <ul>
                    {teams.map((team) => (
                        <li key={team.team_id}>
                            <strong>Name:</strong> {team.name}<br />
                            <Link to={`/teams/${team.team_id}/members`}>View Team Members</Link><br />
                            <strong>Description:</strong> {team.description}<br />
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleDeleteTeam(team.team_id)}
                            >
                                Delete
                            </Button><br />
                        </li>
                    ))}
                </ul>

                {/* Modal for adding teams */}
                <Modal
                    isOpen={isAddTeamPopupOpen}
                    onRequestClose={() => setIsAddTeamPopupOpen(false)}
                    ariaHideApp={false}
                >
                    <h2>Add Team</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Name:</label>
                        <TextField variant="outlined" fullWidth name="name" />
                        <label>Description:</label>
                        <TextField variant="outlined" fullWidth name="description" />
                        <Button variant="contained" type="submit">Add</Button>
                    </form>
                </Modal>
            </GradientContainer>
        </>
    );
};

export default ViewTeams;
