import React, { useState } from 'react';
import "../../css/AddProjectPopup.css";

/**
 * Component for adding a new issue.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.onClose - Function to close the popup.
 * @param {Function} props.onAddIssue - Function to add a new issue.
 */
const AddIssuePopup = ({ onClose, onAddIssue }) => {
  // Initial state for a new issue
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

  // State to hold the new issue data
  const [newIssue, setNewIssue] = useState(initialIssueState);

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIssue({
      ...newIssue,
      [name]: value,
    });
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddIssue(newIssue); // Call the parent's function to add the issue
    onClose(); // Close the popup
  };

  // Function to render input fields based on an array of field descriptions
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

  // Array describing the input fields
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
