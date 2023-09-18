import React, { useState, useEffect } from 'react';
import Logout from './Logout';
import AddProjectPopup from './AddProjectPopup';
import '../css/AddProjectPopup.css';
import { Link } from 'react-router-dom';
const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:3000/projects', {
                    headers: {
                        Authorization: localStorage.getItem('jwtToken'),
                    },
                });

                if (!response.ok) {
                    throw new Error('Error fetching projects');
                }

                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    const handleAddProject = async (newProject) => {
        try {
            const response = await fetch('http://localhost:3000/projects/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('jwtToken'),
                },
                body: JSON.stringify(newProject),
            });

            if (!response.ok) {
                throw new Error('Error adding project');
            }

            const addedProject = await response.json();
            setProjects([...projects, addedProject]);
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    const handleRemoveProject = async (projectId) => {
        try {
            const response = await fetch(`http://localhost:3000/projects/delete/${projectId}`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem('jwtToken'),
                },
            });

            if (!response.ok) {
                throw new Error('Error removing project');
            }

            // Update projects list after removing project
            const updatedProjects = projects.filter(project => project.project_id !== projectId);
            setProjects(updatedProjects);
        } catch (error) {
            console.error('Error removing project:', error);
        }
    };

    const handleUpdateProject = async () => {
        try {
            const response = await fetch(`http://localhost:3000/projects/update/${selectedProject.project_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('jwtToken'),
                },
                body: JSON.stringify(selectedProject),
            });

            if (!response.ok) {
                throw new Error('Error updating project');
            }

            const updatedProjects = projects.map(project =>
                project.project_id === selectedProject.project_id ? selectedProject : project
            );
            setProjects(updatedProjects);
            setSelectedProject(null); // Clear selected project after successful update
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    const openEditPopup = (project) => {
        setSelectedProject({ ...project }); // Copy selected project for editing
        setIsPopupOpen(true); // Open the edit popup
    };

    const closeEditPopup = () => {
        setSelectedProject(null); // Clear selected project
        setIsPopupOpen(false); // Close the edit popup
    };

    return (
        <div>
            <h1>Your Projects</h1>
            <h2><Link to="/teams">Edit Teams</Link></h2>
            <h2><Link to="/register">Register User(s)</Link></h2>
            <button onClick={() => setIsPopupOpen(true)}>Add Project</button>
            <ul>
                {projects.map((project) => (
                    <li key={project.project_id}>
                        <strong>Name:</strong> {project.name}<br />
                        <Link to={`/projects/${project.project_id}/tasks`}>View Tasks</Link><br />
                        <strong>Description:</strong> {project.description}<br />
                        <strong>Maintainer ID:</strong> {project.maintainer_id}<br />
                        <strong>Created At:</strong> {new Date(project.created_at).toLocaleString()}<br />
                        <button onClick={() => handleRemoveProject(project.project_id)}>Remove</button>
                        <button onClick={() => openEditPopup(project)}>Edit</button>
                        <hr />
                    </li>
                ))}
            </ul>

            {isPopupOpen && (
                <AddProjectPopup
                    onClose={closeEditPopup}
                    onAddProject={handleAddProject}
                    projectToUpdate={selectedProject}
                    onUpdateProject={handleUpdateProject}
                />
            )}

            <Logout />
        </div>
    );
};

export default Projects;