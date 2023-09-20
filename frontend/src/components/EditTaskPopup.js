import React, { useState } from 'react';
import "../css/AddProjectPopup.css";

const EditTaskPopup = ({ onClose, onEditTask, editedTask }) => {
  const [editedFields, setEditedFields] = useState({
    name: editedTask.name,
    description: editedTask.description,
    status: editedTask.status,
    priority: editedTask.priority,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFields(prevState => ({ ...prevState, [name]: value }));
  };

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
