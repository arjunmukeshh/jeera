import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddMemberModal from './AddMemberPopup';
const ViewTeamMembers = () => {
    const { teamId } = useParams(); // Accessing the 'teamId' parameter from the URL
    const [teamMembers, setTeamMembers] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const response = await fetch(`http://localhost:3000/teams/${teamId}/members`);
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

    const handleDeleteUser = async (username) => {
        try {
            const response = await fetch(`http://localhost:3000/teams/${teamId}/remove_member`, {
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

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleAddMember = (username) => {
        setTeamMembers([...teamMembers, { username }]); // Update team members list
    };

    return (
        <div>
            <h1>Team Members</h1>
            <button onClick={openAddModal}>Add Team Member</button>
            <ul>
                {teamMembers.map((member) => (
                    <li key={member.user_id}>
                        <strong>Name:</strong> {member.full_name}<br />
                        <strong>Email:</strong> {member.email_id}<br />
                        <button onClick={() => handleDeleteUser(member.username)}>Delete</button><br />
                    </li>
                ))}
            </ul>
            <AddMemberModal
                isOpen={isAddModalOpen}
                onRequestClose={closeAddModal}
                onAddMember={handleAddMember}
                teamId={teamId}
            />
        </div>
    );
};

export default ViewTeamMembers;
