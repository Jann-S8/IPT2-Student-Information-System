import React from 'react';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { Box } from '@mui/material';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import AddStudent from './pages/AddStudent';
import UserManagement from './pages/UserManagement';
import Register from './pages/Register';
import './App.css'

function App() {
  return (
      <BrowserRouter>
      <Box className="container">
        <Box className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/Login" />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/addstudent" element={<AddStudent />} />
            <Route path="/usermanagement" element={<UserManagement />} />
             <Route path="/register" element={<Register />} />
          </Routes>
        </Box>
      </Box>
      </BrowserRouter>
  );
}

export default App;
