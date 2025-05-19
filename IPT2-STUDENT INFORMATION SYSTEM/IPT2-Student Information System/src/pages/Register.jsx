import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Typography, Box } from '@mui/material';
import './Register.css';

function Register() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    IDnumber: '',
    Firstname: '',
    Lastname: '',
    Middlename: '',
    Username: '',
    Password: '',
    Usertype: ''
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {
    // Validation patterns
    const idNumberPattern = /^\d+$/;
    const namePattern = /^[^.]*$/;

    if (!idNumberPattern.test(userData.IDnumber)) {
      alert("ID Number should contain digits only.");
      return;
    }

    if (
      !namePattern.test(userData.Firstname) ||
      !namePattern.test(userData.Lastname) ||
      !namePattern.test(userData.Middlename) ||
      !namePattern.test(userData.Usertype)
    ) {
      alert("Firstname, Lastname, Middlename, and Usertype should not contain '.' characters.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:1337/register', userData);
      alert(response.data);
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Error registering user.");
    }
  };

  const handleGoBack = () => {
    navigate('/login');
  };

  return (
    <Box className="register-container">
      <Typography variant="h4" gutterBottom className="register-title">Register</Typography>

      <TextField
        label="ID Number"
        name="IDnumber"
        value={userData.IDnumber}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        label="First Name"
        name="Firstname"
        value={userData.Firstname}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        label="Last Name"
        name="Lastname"
        value={userData.Lastname}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        label="Middle Name"
        name="Middlename"
        value={userData.Middlename}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        label="Username"
        name="Username"
        value={userData.Username}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        name="Password"
        value={userData.Password}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        label="User Type"
        name="Usertype"
        value={userData.Usertype}
        onChange={handleChange}
        margin="normal"
      />

      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleRegister} className="register-button" sx={{ mr: 1 }}>
          Register
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleGoBack} className="back-button">
          Go Back
        </Button>
      </Box>
    </Box>
  );
}

export default Register;
