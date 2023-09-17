import React, { useState } from 'react';

const AddIssuePopup = ({ onClose, onAddIssue }) => {
  const [newIssue, setNewIssue] = useState({
    issue_type_id: 0,
    summary: '',
    attachments: '',
    description: '',
    reports_to: 0,
    assignee_id: 0,
    priority: '',
    label: '',
    status: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIssue({
      ...newIssue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddIssue(newIssue);
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Add New Issue</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="issue_type_id"
            value={newIssue.issue_type_id}
            onChange={handleInputChange}
            placeholder="Issue Type ID"
            required
          />
          <br />
          <input
            type="text"
            name="summary"
            value={newIssue.summary}
            onChange={handleInputChange}
            placeholder="Summary"
            required
          />
          <br />
          <input
            type="text"
            name="attachments"
            value={newIssue.attachments}
            onChange={handleInputChange}
            placeholder="Attachments"
            required
          />
          <br />
          <input
            type="text"
            name="description"
            value={newIssue.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
          />
          <br />
          <input
            type="number"
            name="reports_to"
            value={newIssue.reports_to}
            onChange={handleInputChange}
            placeholder="Reports To"
            required
          />
          <br />
          <input
            type="number"
            name="assignee_id"
            value={newIssue.assignee_id}
            onChange={handleInputChange}
            placeholder="Assignee ID"
            required
          />
          <br />
          <input
            type="text"
            name="priority"
            value={newIssue.priority}
            onChange={handleInputChange}
            placeholder="Priority"
            required
          />
          <br />
          <input
            type="text"
            name="label"
            value={newIssue.label}
            onChange={handleInputChange}
            placeholder="Label"
            required
          />
          <br />
          <input
            type="text"
            name="status"
            value={newIssue.status}
            onChange={handleInputChange}
            placeholder="Status"
            required
          />
          <br />
          <button type="submit">Add Issue</button>
          <br />
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AddIssuePopup;
