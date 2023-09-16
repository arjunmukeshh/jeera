import React, { useState, useEffect } from 'react';

const AddProjectPopup = ({ onClose, onAddProject, projectToUpdate, onUpdateProject }) => {
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    maintainer_id: 0,
  });

  useEffect(() => {
    if (projectToUpdate) {
      setNewProject({ ...projectToUpdate });
    }
  }, [projectToUpdate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({
      ...newProject,
      [name]: value,
    });
  };

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
    <div className="popup">
      <div className="popup-content">
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
