import React, { useState, useEffect } from 'react';
import "../../css/AddProjectPopup.css";

/**
 * Component for adding or editing a project.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.onClose - Function to close the popup.
 * @param {Function} props.onAddProject - Function to add a new project.
 * @param {Object} props.projectToUpdate - Project data to be edited.
 * @param {Function} props.onUpdateProject - Function to update an existing project.
 */
const AddProjectPopup = ({ onClose, onAddProject, projectToUpdate, onUpdateProject }) => {
  // State for holding project data
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    maintainer_id: 0,
  });

  // Effect to update the form data when editing an existing project
  useEffect(() => {
    if (projectToUpdate) {
      setNewProject({ ...projectToUpdate });
    }
  }, [projectToUpdate]);

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({
      ...newProject,
      [name]: value,
    });
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (projectToUpdate) {
      onUpdateProject();
    } else {
      onAddProject(newProject);
    }

    onClose();
  };

  return (
    <div className="overlay">
      <div className="popup-inner">
        <h2>Add/Edit Project</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={newProject.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
          />
          <br />
          <input
            type="text"
            name="description"
            value={newProject.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
          />
          <br />
          <label>Maintainer's user id</label>
          <input
            type="number"
            name="maintainer_id"
            value={newProject.maintainer_id}
            onChange={handleInputChange}
            placeholder="Maintainer ID"
            required
          />
          <br />
          <button type="submit">Commit</button><br />
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AddProjectPopup;
