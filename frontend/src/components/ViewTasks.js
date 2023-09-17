import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Logout from './Logout';
import AddTaskPopup from './AddTaskPopup';
import EditTaskPopup from './EditTaskPopup'; // Added this import
import ConfirmPopup from './ConfirmPopup';
import { Link } from 'react-router-dom';
const ViewTasks = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:3000/projects/${projectId}/tasks`, {
          headers: {
            Authorization: localStorage.getItem('jwtToken'),
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching tasks');
        }

        const data = await response.json();
        setTasks(data.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [projectId]);

  const handleAddTask = async (newTask) => {
    try {
      const response = await fetch(`http://localhost:3000/projects/${projectId}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('jwtToken'),
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error('Error adding task');
      }

      const addedTask = await response.json();
      setTasks([...tasks, addedTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditTask = async (editedTask) => {
    try {
      const response = await fetch(`http://localhost:3000/projects/${projectId}/tasks/${editedTask.task_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('jwtToken'),
        },
        body: JSON.stringify(editedTask),
      });

      if (!response.ok) {
        throw new Error('Error editing task');
      }

      const updatedTasks = tasks.map(task =>
        task.task_id === editedTask.task_id ? editedTask : task
      );
      setTasks(updatedTasks);
      setSelectedTask(null); // Clear selected task after successful edit
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const openEditPopup = (task) => {
    setSelectedTask({ ...task }); // Copy selected task for editing
    setIsEditPopupOpen(true); // Open the edit popup
  };

  const closeEditPopup = () => {
    setSelectedTask(null); // Clear selected task
    setIsEditPopupOpen(false); // Close the edit popup
  };

  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const openDeletePopup = (task) => {
    setTaskToDelete(task); // Set task to delete
    setIsDeletePopupOpen(true); // Open the delete popup
  };

  const closeDeletePopup = () => {
    setTaskToDelete(null); // Clear task to delete
    setIsDeletePopupOpen(false); // Close the delete popup
  };

  const handleDeleteTask = async () => {
    if (taskToDelete) {
      try {
        const response = await fetch(`http://localhost:3000/projects/${projectId}/tasks/${taskToDelete.task_id}`, {
          method: 'DELETE',
          headers: {
            Authorization: localStorage.getItem('jwtToken'),
          },
        });

        if (!response.ok) {
          throw new Error('Error deleting task');
        }

        const updatedTasks = tasks.filter(task =>
          task.task_id !== taskToDelete.task_id
        );
        setTasks(updatedTasks);
        setTaskToDelete(null); // Clear task to delete after successful deletion
        window.location.reload();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const [groupingOption, setGroupingOption] = useState(null);

  const handleGroupByStatus = () => {
    setGroupingOption('status');
  };

  const handleGroupByPriority = () => {
    setGroupingOption('priority');
  };

  // Function to group tasks
  const groupTasks = () => {
    if (groupingOption === 'status') {
      // Group tasks by status
      const groupedTasks = tasks.reduce((groups, task) => {
        const status = task.status;
        if (!groups[status]) {
          groups[status] = [];
        }
        groups[status].push(task);
        return groups;
      }, {});

      return groupedTasks;
    }

    if (groupingOption === 'priority') {
      // Group tasks by priority
      const groupedTasks = tasks.reduce((groups, task) => {
        const priority = task.priority;
        if (!groups[priority]) {
          groups[priority] = [];
        }
        groups[priority].push(task);
        return groups;
      }, {});

      return groupedTasks;
    }

    return { 'Ungrouped': tasks }; // Default ungrouped view
  };

  const [sortingOption, setSortingOption] = useState({
    field: null,
    order: 'asc', // Default is ascending
  });

  const handleSortByCreated = () => {
    setSortingOption(prevSortingOption => ({
      field: 'created_at',
      order: prevSortingOption.order === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortTasks = (tasksToSort) => {
    if (sortingOption.field === 'created_at') {
      // Sort tasks by creation date
      return [...tasksToSort].sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);

        if (sortingOption.order === 'asc') {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      });
    }

    return tasksToSort; // Default unsorted view
  };

  return (
    <div>
      <h1>Tasks for Project {projectId}</h1>
      <button onClick={() => setIsAddPopupOpen(true)}>Add Task</button>
      <button onClick={handleGroupByStatus}>Group by Status</button>
      <button onClick={handleGroupByPriority}>Group by Priority</button>
      <button onClick={handleSortByCreated}>
        Sort by Created ({sortingOption.order === 'asc' ? 'Asc' : 'Desc'})
      </button>
      <ul>
        {Object.entries(groupTasks()).map(([groupKey, groupTasks]) => (
          <div key={groupKey}>
            <h3>{groupKey}</h3>
            {sortTasks(groupTasks).map((task) => (
              <li key={task.task_id}>
                <strong>Name:</strong> {task.name}<br />
                <Link to={`/projects/${projectId}/tasks/${task.task_id}/issues`}>
                  View Issues
                </Link>
                <strong>Description:</strong> {task.description}<br />
                <strong>Status:</strong> {task.status}<br />
                <strong>Priority:</strong> {task.priority}<br />
                <strong>Created:</strong> {task.created_at}<br />
                <button onClick={() => openEditPopup(task)}>Edit</button>
                <button onClick={() => openDeletePopup(task)}>Delete</button>
                <hr />
                <hr />
              </li>
            ))}
          </div>
        ))}
      </ul>

      {isAddPopupOpen && (
        <AddTaskPopup
          onClose={() => setIsAddPopupOpen(false)}
          onAddTask={handleAddTask}
        />
      )}

      {isEditPopupOpen && (
        <EditTaskPopup
          onClose={closeEditPopup}
          onUpdateTask={handleEditTask}
          taskToEdit={selectedTask}
        />
      )}

      {isDeletePopupOpen && (
        <ConfirmPopup
          message={`Are you sure you want to delete task: ${taskToDelete.name}?`}
          onConfirm={handleDeleteTask}
          onCancel={closeDeletePopup}
        />
      )}

      <Logout />
    </div>
  );
};

export default ViewTasks;