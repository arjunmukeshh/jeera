import React, { useState } from 'react';
import "../../css/AddProjectPopup.css";

const AddIssuePopup = ({ onClose, onAddIssue }) => {
  const initialIssueState = {
    issue_type_id: 1,
    summary: '',
    attachments: '',
    description: '',
    reports_to: 0,
    assignee_id: 0,
    priority: '',
    label: '',
    status: '',
  };

  const [newIssue, setNewIssue] = useState(initialIssueState);

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

  const renderInputFields = (fields) => {
    return fields.map(field => (
      <div key={field.name}>
        <input
          type={field.type || "text"}
          name={field.name}
          value={newIssue[field.name]}
          onChange={handleInputChange}
          placeholder={field.placeholder}
          required
        />
        <br />
      </div>
    ));
  };

  const inputFields = [
    { name: 'issue_type_id', type: 'number', placeholder: 'Issue Type ID' },
    { name: 'summary', placeholder: 'Summary' },
    { name: 'attachments', placeholder: 'Attachments' },
    { name: 'description', placeholder: 'Description' },
    { name: 'reports_to', type: 'number', placeholder: 'Reports To' },
    { name: 'assignee_id', type: 'number', placeholder: 'Assignee ID' },
    { name: 'priority', placeholder: 'Priority' },
    { name: 'label', placeholder: 'Label' },
    { name: 'status', placeholder: 'Status' },
  ];

  return (
    <div className="overlay">
      <div className="popup-inner">
        <h2>Add New Issue</h2>
        <form onSubmit={handleSubmit}>
          {renderInputFields(inputFields)}
          <button type="submit">Add Issue</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
      
    </div>
  );
};

export default AddIssuePopup;
