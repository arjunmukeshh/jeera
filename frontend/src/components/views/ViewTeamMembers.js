import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddMemberModal from '../popups/AddMemberPopup';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from '../Header';
import API_BASE_URL from '../../config/config';

// Styled component for the gradient container
const GradientContainer = styled('div')({
    background: 'linear-gradient(45deg, #4B0082, #000000)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
});

// Styled component for member details container
const MemberDetails = styled('div')({
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
    width: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const ViewTeamMembers = () => {
    const { teamId } = useParams(); // Accessing the 'teamId' parameter from the URL
    const [teamMembers, setTeamMembers] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Fetch team members on component mount
    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/teams/${teamId}/members`);
                if (!response.ok) {
                    throw new Error('Error fetching team members');
                }
                const data = await response.json();
                setTeamMembers(data.usernames);
            } catch (error) {
                console.error('Error fetching team members:', error);
            }
        };

        fetchTeamMembers();
    }, [teamId]);

    // Function to handle deletion of a team member
    const handleDeleteUser = async (username) => {
        try {
            const response = await fetch(`${API_BASE_URL}/teams/${teamId}/remove_member`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });

            if (!response.ok) {
                throw new Error('Error removing team member');
            }

            // Update team members after successful removal
            const updatedTeamMembers = teamMembers.filter(member => member.username !== username);
            setTeamMembers(updatedTeamMembers);
        } catch (error) {
            console.error('Error removing team member:', error);
        }
    };

    // Function to open the add member modal
    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    // Function to close the add member modal
    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    // Function to handle addition of a team member
    const handleAddMember = (username) => {
        setTeamMembers([...teamMembers, { username }]); // Update team members list
    };

    // Styled Button component
    const StyledButton = styled(Button)({
        backgroundColor: '#000',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#333',
        },
    });

    return (
        <>
            <Header />
            <GradientContainer>
                <h1 style={{color:'white'}}>Members</h1>
                <div>
                    <StyledButton variant="contained" onClick={openAddModal}>Add Team Member</StyledButton>
                    {teamMembers.map((member) => (
                        <MemberDetails key={member.user_id}>
                            <strong>Name:</strong> {member.full_name}<br />
                            <strong>Email:</strong> {member.email_id}<br />
                            <Button variant="contained" color="secondary" onClick={() => handleDeleteUser(member.username)}>Delete</Button><br />
                        </MemberDetails>
                    ))}
                    <AddMemberModal
                        isOpen={isAddModalOpen}
                        onRequestClose={closeAddModal}
                        onAddMember={handleAddMember}
                        teamId={teamId}
                    />
                </div>
            </GradientContainer>
        </>
    );
};

export default ViewTeamMembers;
