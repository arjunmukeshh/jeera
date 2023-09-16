import React, { useState, useEffect } from 'react';
import Logout from './Logout';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects data here and update the state
    // For example:
    fetch('http://localhost:3000/projects', {
      headers: {
        Authorization: localStorage.getItem('jwtToken'), // Add the user's token here
      },
    })
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Error fetching projects:', error));
  }, []);

  return (
    <div>
      <h1>Your Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.project_id}>
            <strong>Name:</strong> {project.name}<br />
            <strong>Description:</strong> {project.description}<br />
            <strong>Maintainer ID:</strong> {project.maintainer_id}<br />
            <strong>Created At:</strong> {new Date(project.created_at).toLocaleString()}<br />
            <hr />
          </li>
        ))}
      </ul>
      <Logout />
    </div>
  );
};

export default Projects;
