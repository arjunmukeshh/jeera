import React, { useState, useEffect } from 'react';

const EditTaskPopup = ({ onClose, onUpdateTask, taskToEdit }) => {
  const [editedTask, setEditedTask] = useState(taskToEdit);

  useEffect(() => {
    setEditedTask(taskToEdit);
  }, [taskToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({
      ...editedTask,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateTask(editedTask);
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={editedTask.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
          />
          <br />
          <input
            type="text"
            name="description"
            value={editedTask.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
          />
          <br />
          <select
            name="status"
            value={editedTask.status}
            onChange={handleInputChange}
            required
          >
            <option value="to do">To Do</option>
            <option value="in progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <br />
          <select
            name="priority"
            value={editedTask.priority}
            onChange={handleInputChange}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <br />
          <button type="submit">Save Changes</button><br />
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default EditTaskPopup;
