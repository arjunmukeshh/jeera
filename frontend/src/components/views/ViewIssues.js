import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Papa from 'papaparse'
import Header from '../Header';
import Logout from '../Logout';
import AddIssuePopup from '../popups/AddIssuePopup';
import EditIssuePopup from '../popups/EditIssuePopup';
import API_BASE_URL from '../../config/config';

const ViewIssues = () => {
    const { projectId, taskId } = useParams();
    const [issues, setIssues] = useState([]);
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
    const isAdmin = localStorage.getItem('isAdmin');
    const user_id = localStorage.getItem('user_id');
    const maintainer_id = localStorage.getItem(`project_${projectId}_maintainer`);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [groupBy, setGroupBy] = useState(null);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks/${taskId}/issues`, {
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
            const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks/${taskId}/issues/add`, {
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
            const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks/${taskId}/issues/${issueId}`, {
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

    const openEditPopup = (issue) => {
        setSelectedIssue({ ...issue });
        setIsEditPopupOpen(true);
    };

    const closeEditPopup = () => {
        setSelectedIssue(null);
        setIsEditPopupOpen(false);
    };

    const handleEditIssue = async (editedIssue) => {
        try {
            const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks/${taskId}/issues/${editedIssue.issue_id}`, {
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
            setSelectedIssue(null);
            setIsEditPopupOpen(false);
        } catch (error) {
            console.error('Error editing issue:', error);
        }
    };

    const groupIssuesBy = (field) => {
        setGroupBy(groupBy === field ? null : field);
    };

    const changeHandler = (event) => {
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: async function (results) {
                const { data } = results;

                for (const issue of data) {
                    try {
                        const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks/${taskId}/issues/add`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: localStorage.getItem('jwtToken'),
                            },
                            body: JSON.stringify(issue),
                        });

                        if (!response.ok) {
                            throw new Error(`Error adding issue: ${issue.name}`);
                        }

                        const addedIssue = await response.json();
                        setIssues([...issues, addedIssue]);
                    } catch (error) {
                        console.error(error);
                    }
                }
            },
        });
    };

    const getGroupedIssues = () => {
        if (!groupBy) return issues;

        const groupedIssues = issues.reduce((groups, issue) => {
            const key = issue[groupBy];
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(issue);
            return groups;
        }, {});

        return Object.keys(groupedIssues).map(key => ({
            group: key,
            issues: groupedIssues[key],
        }));
    };

    const groupedIssues = getGroupedIssues();

    return (
        <div>
            <Header />
            <h1>Issues for Task {taskId}</h1>
            {(isAdmin || user_id == maintainer_id) && (
                <div>
                    <button onClick={() => setIsAddPopupOpen(true)}>Add Issue</button>
                    <input
                        type="file"
                        name="file"
                        accept=".csv"
                        onChange={changeHandler}
                        style={{ display: "block", margin: "10px auto" }}
                    />
                </div>
            )}
            <br />
            <div>
                <button onClick={() => groupIssuesBy('status')}>Group by Status</button>
                <button onClick={() => groupIssuesBy('priority')}>Group by Priority</button>
            </div>

            {groupBy && (
                <button onClick={() => setGroupBy(null)}>Clear Grouping</button>
            )}

            {groupBy ? (
                <div>
                    <h2>Grouped By {groupBy.charAt(0).toUpperCase() + groupBy.slice(1)}</h2>
                    {groupedIssues.map(group => (
                        <div key={group.group}>
                            <h3>{group.group}</h3>
                            <ul>
                                {group.issues.map((issue) => (
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
                        </div>
                    ))}
                </div>
            ) : (
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
                            <div>
                                <button onClick={() => openEditPopup(issue)}>Edit</button><br />
                                <button onClick={() => handleDeleteIssue(issue.issue_id)}>Delete</button><br />
                            </div>
                            <hr />
                        </li>
                    ))}
                </ul>
            )}

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
