import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Projects from './components/views/Projects';
import ErrorPage from './pages/ErrorPage';
import ViewTasks from './components/views/ViewTasks';
import ViewIssues from './components/views/ViewIssues';
import Teams from './components/views/Teams';
import ViewTeamMembers from './components/views/ViewTeamMembers';
import Users from './components/views/Users';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import LandingPage from './pages/LandingPage';

const authorized = () => {
  // Check if the user is authorized
  const jwtToken = localStorage.getItem('jwtToken');
  return jwtToken !== null;
};

const PrivateRoute = ({ children }) => {
  const authed = authorized() // isauth() returns true or false based on localStorage

  return authed ? children : <Navigate to="/error" />;
}
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/dashboard" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />

        <Route path="/register" element={<PrivateRoute><Register /></PrivateRoute>} />

        <Route path="/projects/:projectId/tasks" element={<PrivateRoute><ViewTasks /></PrivateRoute>} />
        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        />
        <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} ></Route>
        <Route path="/projects/:projectId/tasks/:taskId/issues"
          element={<PrivateRoute><ViewIssues /></PrivateRoute>} >
        </Route>

        <Route path="/teams" element={<PrivateRoute><Teams /></PrivateRoute>} />
        <Route path="/teams/:teamId/members" element={<PrivateRoute><ViewTeamMembers /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}


export default App;
