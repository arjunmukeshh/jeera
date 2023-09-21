import React, { useState } from 'react';
import "../../css/AddProjectPopup.css";

/**
 * Component for editing a task via a popup.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.onClose - Function to close the popup.
 * @param {Function} props.onEditTask - Function to edit the task.
 * @param {Object} props.editedTask - The task object to be edited.
 */
const EditTaskPopup = ({ onClose, onEditTask, editedTask }) => {
  // State to hold edited field values
  const [editedFields, setEditedFields] = useState({
    name: editedTask.name,
    description: editedTask.description,
    status: editedTask.status,
    priority: editedTask.priority,
  });

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFields(prevState => ({ ...prevState, [name]: value }));
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onEditTask({ ...editedTask, ...editedFields });
    onClose();
  };

  return (
    <div className="overlay">
      <div className="popup-inner">
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedFields.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={editedFields.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={editedFields.status}
              onChange={handleChange}
              required
            >
              <option value="to do">To Do</option>
              <option value="in progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={editedFields.priority}
              onChange={handleChange}
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskPopup;
