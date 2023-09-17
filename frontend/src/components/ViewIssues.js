import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Logout from './Logout';
import AddIssuePopup from './AddIssuePopup';
import EditIssuePopup from './EditIssuePopup';
const ViewIssues = () => {
    const { projectId, taskId } = useParams();
    const [issues, setIssues] = useState([]);
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await fetch(`http://localhost:3000/projects/${projectId}/tasks/${taskId}/issues`, {
                    headers: {
                        Authorization: localStorage.getItem('jwtToken'),
                    },
                });

                if (!response.ok) {
                    throw new Error('Error fetching issues');
                }

                const data = await response.json();
                setIssues(data);
            } catch (error) {
                console.error('Error fetching issues:', error);
            }
        };

        fetchIssues();
    }, [projectId, taskId]);

    const handleAddIssue = async (newIssue) => {
        try {
            const response = await fetch(`http://localhost:3000/projects/${projectId}/tasks/${taskId}/issues/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('jwtToken'),
                },
                body: JSON.stringify(newIssue),
            });

            if (!response.ok) {
                throw new Error('Error adding issue');
            }

            const addedIssue = await response.json();
            setIssues([...issues, addedIssue]);
            setIsAddPopupOpen(false);
        } catch (error) {
            console.error('Error adding issue:', error);
        }
    };

    const handleDeleteIssue = async (issueId) => {
        try {
            const response = await fetch(`http://localhost:3000/projects/${projectId}/tasks/${taskId}/issues/${issueId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: localStorage.getItem('jwtToken'),
                },
            });

            if (!response.ok) {
                throw new Error('Error deleting issue');
            }

            const updatedIssues = issues.filter(issue => issue.issue_id !== issueId);
            setIssues(updatedIssues);
        } catch (error) {
            console.error('Error deleting issue:', error);
        }
    };

    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState(null);

    const openEditPopup = (issue) => {
        setSelectedIssue({ ...issue }); // Copy selected issue for editing
        setIsEditPopupOpen(true); // Open the edit popup
    };

    const closeEditPopup = () => {
        setSelectedIssue(null); // Clear selected issue
        setIsEditPopupOpen(false); // Close the edit popup
    };

    const handleEditIssue = async (editedIssue) => {
        try {
            const response = await fetch(`http://localhost:3000/projects/${projectId}/tasks/${taskId}/issues/${editedIssue.issue_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('jwtToken'),
                },
                body: JSON.stringify(editedIssue),
            });

            if (!response.ok) {
                throw new Error('Error editing issue');
            }

            const updatedIssues = issues.map(issue =>
                issue.issue_id === editedIssue.issue_id ? editedIssue : issue
            );
            setIssues(updatedIssues);
            setSelectedIssue(null); // Clear selected issue after successful edit
            setIsEditPopupOpen(false); // Close the edit popup
        } catch (error) {
            console.error('Error editing issue:', error);
        }
    };

    return (
        <div>
            <h1>Issues for Task {taskId}</h1>
            <button onClick={() => setIsAddPopupOpen(true)}>Add Issue</button>
            <ul>
                {issues.map((issue) => (
                    <li key={issue.issue_id}>
                        <strong>Issue Type ID:</strong> {issue.issue_type_id}<br />
                        <strong>Summary:</strong> {issue.summary}<br />
                        <strong>Attachments:</strong> {issue.attachments}<br />
                        <strong>Description:</strong> {issue.description}<br />
                        <strong>Reports To:</strong> {issue.reports_to}<br />
                        <strong>Assignee ID:</strong> {issue.assignee_id}<br />
                        <strong>Priority:</strong> {issue.priority}<br />
                        <strong>Label:</strong> {issue.label}<br />
                        <strong>Status:</strong> {issue.status}<br />
                        <button onClick={() => openEditPopup(issue)}>Edit</button><br />
                        <button onClick={() => handleDeleteIssue(issue.issue_id)}>Delete</button><br />
                        <hr />
                    </li>
                ))}
            </ul>
            {isEditPopupOpen && (
                <EditIssuePopup
                    onClose={closeEditPopup}
                    onUpdateIssue={handleEditIssue}
                    issueToEdit={selectedIssue}
                />
            )}
            {isAddPopupOpen && (
                <AddIssuePopup
                    onClose={() => setIsAddPopupOpen(false)}
                    onAddIssue={handleAddIssue}
                />
            )}
            <Logout />
        </div>
    );
};

export default ViewIssues;
