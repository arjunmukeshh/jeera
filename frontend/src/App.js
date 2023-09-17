import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Index from './components/Index';
import Projects from './components/Projects';
import ErrorPage from './pages/ErrorPage';
import ViewTasks from './components/ViewTasks';
import ViewIssues from './components/ViewIssues';
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
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/projects/:projectId/tasks" element={<PrivateRoute><ViewTasks /></PrivateRoute>} />
        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        />

        <Route path="/projects/:projectId/tasks/:taskId/issues"
          element = {<ViewIssues />} >
        </Route>
      </Routes>
    </Router>
  );
}


export default App;
