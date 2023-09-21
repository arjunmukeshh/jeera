import React, { useState } from 'react';
import "../../css/AddProjectPopup.css";

/**
 * Component for editing an existing issue via a popup.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.onClose - Function to close the popup.
 * @param {Function} props.onUpdateIssue - Function to update the issue.
 * @param {Object} props.issueToEdit - The issue object to be edited.
 */
const EditIssuePopup = ({ onClose, onUpdateIssue, issueToEdit }) => {
    // State to hold the edited issue
    const [editedIssue, setEditedIssue] = useState({ ...issueToEdit });

    // Handler for input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedIssue({
            ...editedIssue,
            [name]: value,
        });
    };

    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateIssue(editedIssue);
        onClose();
    };

    return (
        <div className="overlay">
            <div className="popup-inner">
                <h2>Edit Issue</h2>
                <form onSubmit={handleSubmit}>
                    {/* Issue Type ID */}
                    <label>
                        Issue Type ID:
                        <input
                            type="text"
                            name="issue_type_id"
                            value={editedIssue.issue_type_id}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />

                    {/* Summary */}
                    <label>
                        Summary:
                        <input
                            type="text"
                            name="summary"
                            value={editedIssue.summary}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />

                    {/* Attachments */}
                    <label>
                        Attachments:
                        <input
                            type="text"
                            name="attachments"
                            value={editedIssue.attachments}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />

                    {/* Description */}
                    <label>
                        Description:
                        <input
                            type="text"
                            name="description"
                            value={editedIssue.description}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />

                    {/* Reports To */}
                    <label>
                        Reports To:
                        <input
                            type="text"
                            name="reports_to"
                            value={editedIssue.reports_to}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />

                    {/* Assignee ID */}
                    <label>
                        Assignee ID:
                        <input
                            type="text"
                            name="assignee_id"
                            value={editedIssue.assignee_id}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />

                    {/* Priority */}
                    <label>
                        Priority:
                        <input
                            type="text"
                            name="priority"
                            value={editedIssue.priority}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />

                    {/* Label */}
                    <label>
                        Label:
                        <input
                            type="text"
                            name="label"
                            value={editedIssue.label}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />

                    {/* Status */}
                    <label>
                        Status:
                        <input
                            type="text"
                            name="status"
                            value={editedIssue.status}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />

                    <button type="submit">Save Changes</button>
                </form>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default EditIssuePopup;
