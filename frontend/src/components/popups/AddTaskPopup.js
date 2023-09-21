import React, { useState } from 'react';
import "../../css/AddProjectPopup.css";

/**
 * Component for adding a new task.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.onClose - Function to close the popup.
 * @param {Function} props.onAddTask - Function to add a new task.
 */
const AddTaskPopup = ({ onClose, onAddTask }) => {
  // State for holding task data
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    status: 'to do',
    priority: 'medium',
  });

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(newTask);
    onClose();
  };

  return (
    <div className="overlay">
      <div className="popup-inner">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={newTask.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
          />
          <br />
          <input
            type="text"
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
          />
          <br />
          <select
            name="status"
            value={newTask.status}
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
            value={newTask.priority}
            onChange={handleInputChange}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <br />
          <button type="submit">Add Task</button><br />
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AddTaskPopup;
