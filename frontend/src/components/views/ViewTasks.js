import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Logout from '../Logout';
import AddTaskPopup from '../popups/AddTaskPopup';
import ConfirmPopup from '../popups/ConfirmPopup';
import EditTaskPopup from '../popups/EditTaskPopup';
import Papa from 'papaparse';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from '../Header';
import API_BASE_URL from '../../config/config';

const TaskCard = styled(Card)(({ taskStatus }) => ({
  backgroundColor: taskStatus === 'to do' ? '#FF0000' : // red for to do
    taskStatus === 'in progress' ? '#FF4500' : // orange for In Progress
      taskStatus === 'done' ? '#32CD32' : // green for done
        'transparent', // Default transparent
  color: '#fff',
  marginBottom: '10px',
}));

const TaskCardContent = styled(CardContent)({
  paddingBottom: '16px !important', // Override MUI styles
});

const ViewTasks = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const isAdmin = localStorage.getItem('isAdmin')
  const user_id = localStorage.getItem('user_id')
  var maintainer_id;

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

  const openEditPopup = (task) => {
    setEditedTask(task); // Set task to edit
    setIsEditPopupOpen(true); // Open the edit popup
  };

  const closeEditPopup = () => {
    setEditedTask(null); // Clear task being edited
    setIsEditPopupOpen(false); // Close the edit popup
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/projects/${projectId}/${user_id}/tasks`, {
          headers: {
            Authorization: localStorage.getItem('jwtToken'),
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching tasks');
        }

        const data = await response.json();
        maintainer_id = localStorage.getItem(`project_${projectId}_maintainer`)
        setTasks(data.tasksjson.data);
        // Set writeTasks and writeIssues in local storage
        console.log(data.writejson.data)
        let writeTasksFlag = 0;
        let writeIssuesFlag = 0;

        // Iterate through the array
        data.writejson.data.forEach(item => {
          if (item.WriteTasks === "1") {
            writeTasksFlag = 1;
          }
          if (item.WriteIssues === "1") {
            writeIssuesFlag = 1;
          }
        });
        console.log(writeTasksFlag);
        // Set flags in local storage
        localStorage.setItem('writeTasks', writeTasksFlag);
        localStorage.setItem('writeIssues', writeIssuesFlag);
        
        console.log(localStorage.getItem(`writeTasks`))
        const projectTeamsResponse = await fetch(`${API_BASE_URL}/projects/${user_id}/${projectId}`, {
          headers: {
            Authorization: localStorage.getItem('jwtToken'),
          },
        });

        if (!projectTeamsResponse.ok) {
          throw new Error('Error fetching project teams');
        }

        const projectTeamsData = await projectTeamsResponse.json();


      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [projectId]);

  const handleAddTask = async (newTask) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks`, {
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
      window.location.reload();
    } catch (error) {
      console.error('Error adding task:', error);
    }
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
        const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks/${taskToDelete.task_id}`, {
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

  const changeHandler = async (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: async function (results) {
        const tasksToAdd = results.data;
        for (const task of tasksToAdd) {
          try {
            const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('jwtToken'),
              },
              body: JSON.stringify(task),
            });

            if (!response.ok) {
              throw new Error('Error adding task');
            }

            const addedTask = await response.json();
            setTasks([...tasks, addedTask]);
          } catch (error) {
            console.error('Error adding task:', error);
          }
        }
      },
    });
  };

  const handleEditTask = async (editedTask) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks/${editedTask.task_id}`, {
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

      const updatedTask = await response.json();
      // Update the task in the tasks state
      setTasks(tasks.map(task => (task.task_id === updatedTask.task_id ? updatedTask : task)));
      closeEditPopup(); // Close the edit popup after successful edit
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  localStorage.setItem('maintainer_id', projectId.maintaine)
  return (
    <div>
      <Header />
      <h1>Tasks for Project {projectId}</h1>
      {(isAdmin || maintainer_id == user_id) && <button onClick={() => setIsAddPopupOpen(true)}>Add Task</button>}
      <button onClick={handleGroupByStatus}>Group by Status</button>
      <button onClick={handleGroupByPriority}>Group by Priority</button>
      <button onClick={handleSortByCreated}>
        Sort by Created ({sortingOption.order === 'asc' ? 'Asc' : 'Desc'})
      </button>
      {isAdmin && <input
        type="file"
        name="file"
        accept=".csv"
        onChange={changeHandler}
        style={{ display: "block", margin: "10px auto" }}
      />
      }
      <Grid container spacing={2}>
        {Object.entries(groupTasks()).map(([groupKey, groupTasks]) => (
          <Grid item xs={12} key={groupKey}>
            <h3>{groupKey}</h3>
            {sortTasks(groupTasks).map((task) => (
              <TaskCard key={task.task_id} taskStatus={task.status}>
                <TaskCardContent>
                  <Typography variant="h5">
                    <strong>Name:</strong> {task.name}
                  </Typography>
                  <Typography variant="body1">
                    <Link to={`/projects/${projectId}/tasks/${task.task_id}/issues`}>
                      View Issues
                    </Link>
                  </Typography>
                  <Typography variant="body1">
                    <strong>Description:</strong> {task.description}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Status:</strong> {task.status}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Priority:</strong> {task.priority}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Created:</strong> {task.created_at}
                  </Typography>
                </TaskCardContent>
                <CardActions>
                  {(isAdmin || maintainer_id == user_id || localStorage.getItem("writeTasks") == "1") && (
                    <React.Fragment>
                      <Button variant="contained" onClick={() => openEditPopup(task)}>
                        Edit
                      </Button>
                    </React.Fragment>)}

                  {(isAdmin ) && (
                    <React.Fragment>
                      <Button variant="contained" onClick={() => openDeletePopup(task)}>
                        Delete
                      </Button>

                    </React.Fragment>
                  )}
                </CardActions>
              </TaskCard>
            ))}
          </Grid>
        ))}
      </Grid>

      {isAddPopupOpen && (
        <AddTaskPopup
          onClose={() => setIsAddPopupOpen(false)}
          onAddTask={handleAddTask}
        />
      )}

      {isEditPopupOpen && (
        <EditTaskPopup
          onClose={closeEditPopup}
          onEditTask={handleEditTask}
          editedTask={editedTask}
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