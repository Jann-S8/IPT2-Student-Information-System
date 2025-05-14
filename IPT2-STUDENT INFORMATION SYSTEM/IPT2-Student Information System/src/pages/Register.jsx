import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Box } from '@mui/material';

function Register() {
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
    try {
      const response = await axios.post('http://localhost:1337/register', userData);
      alert(response.data);
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Error registering user.");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      <TextField
        label="ID Number"
        name="IDnumber"
        value={userData.IDnumber}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="First Name"
        name="Firstname"
        value={userData.Firstname}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Last Name"
        name="Lastname"
        value={userData.Lastname}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Middle Name"
        name="Middlename"
        value={userData.Middlename}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Username"
        name="Username"
        value={userData.Username}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        name="Password"
        value={userData.Password}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="User Type"
        name="Usertype"
        value={userData.Usertype}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleRegister} fullWidth sx={{ marginTop: 2 }}>
        Register
      </Button>
    </Box>
  );
}

export default Register;
