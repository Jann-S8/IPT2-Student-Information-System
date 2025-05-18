import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Modal, TextField, Box
} from "@mui/material";
import Sidebar from "./Sidebar";
import "./UserManagement.css";

function UserManagement() {
  // References for form inputs
  const idRef = useRef();
  const fnameRef = useRef();
  const lnameRef = useRef();
  const mnameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const usertypeRef = useRef();

  // State management
  const [users, setUsers] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    IDnumber: "", Firstname: "", Lastname: "", Middlename: "", 
    Username: "", Password: "", Usertype: ""
  });

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // API functions
  async function fetchUsers() {
    try {
      const response = await axios.get("http://localhost:1337/fetchusers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  async function handleAddUser() {
    const newUser = {
      IDnumber: idRef.current.value,
      Firstname: fnameRef.current.value,
      Lastname: lnameRef.current.value,
      Middlename: mnameRef.current.value,
      Username: usernameRef.current.value,
      Password: passwordRef.current.value,
      Usertype: usertypeRef.current.value,
    };

    if (!validateUserInput(newUser)) return;

    try {
      await axios.post("http://localhost:1337/addusermongo", newUser);
      fetchUsers();
      setAddModalOpen(false);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  }

  async function handleUpdateUser() {
    if (!validateUserInput(currentUser)) return;

    try {
      await axios.put(`http://localhost:1337/updateuser/${currentUser.originalID}`, currentUser);
      fetchUsers();
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  async function handleDeleteUser(id) {
    try {
      await axios.delete(`http://localhost:1337/deleteuser/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  // Helper functions
  function validateUserInput(user) {
    const numberRegex = /^[0-9]+$/;
    const letterRegex = /^[A-Za-z\s]+$/;

    if (!numberRegex.test(user.IDnumber)) {
      alert("ID Number should contain numbers only.");
      return false;
    }
    if (!letterRegex.test(user.Firstname)) {
      alert("First Name should contain letters and spaces only.");
      return false;
    }
    if (!letterRegex.test(user.Lastname)) {
      alert("Last Name should contain letters and spaces only.");
      return false;
    }
    if (!letterRegex.test(user.Middlename)) {
      alert("Middle Name should contain letters and spaces only.");
      return false;
    }
    if (!letterRegex.test(user.Usertype)) {
      alert("User Type should contain letters and spaces only.");
      return false;
    }

    return true;
  }

  function openEditModal(user) {
    setCurrentUser({ ...user, originalID: user.IDnumber });
    setEditModalOpen(true);
  }

  function handleEditChange(event) {
    setCurrentUser({ ...currentUser, [event.target.name]: event.target.value });
  }

  return (
    <div className="container">
      <Sidebar />
      <main className="content">
        <div className="header">
          <Typography variant="h4">USER MANAGEMENT</Typography>
          <Button variant="contained" onClick={() => setAddModalOpen(true)}>Add User</Button>
        </div>

        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Middle Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>User Type</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.IDnumber}>
                  <TableCell>{user.IDnumber}</TableCell>
                  <TableCell>{user.Firstname}</TableCell>
                  <TableCell>{user.Lastname}</TableCell>
                  <TableCell>{user.Middlename}</TableCell>
                  <TableCell>{user.Username}</TableCell>
                  <TableCell>{user.Password}</TableCell>
                  <TableCell>{user.Usertype}</TableCell>
                  <TableCell>
                    <Button className="edit-btn" variant="contained" onClick={() => openEditModal(user)}>Edit</Button>
                    <Button className="delete-btn" variant="contained" onClick={() => handleDeleteUser(user.IDnumber)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add User Modal */}
        <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)}>
          <Box className="modal">
            <Typography variant="h6">Add User</Typography>
            <TextField inputRef={idRef} label="ID Number" fullWidth margin="normal" />
            <TextField inputRef={fnameRef} label="First Name" fullWidth margin="normal" />
            <TextField inputRef={lnameRef} label="Last Name" fullWidth margin="normal" />
            <TextField inputRef={mnameRef} label="Middle Name" fullWidth margin="normal" />
            <TextField inputRef={usernameRef} label="Username" fullWidth margin="normal" />
            <TextField inputRef={passwordRef} label="Password" type="password" fullWidth margin="normal" />
            <TextField inputRef={usertypeRef} label="User Type" fullWidth margin="normal" />
            <div className="modal-buttons">
              <Button variant="contained" onClick={handleAddUser}>Add</Button>
              <Button variant="contained" onClick={() => setAddModalOpen(false)}>Cancel</Button>
            </div>
          </Box>
        </Modal>

        {/* Edit User Modal */}
        <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
          <Box className="modal">
            <Typography variant="h6">Edit User</Typography>
            <TextField name="IDnumber" label="ID Number" value={currentUser.IDnumber} onChange={handleEditChange} fullWidth margin="normal" />
            <TextField name="Firstname" label="First Name" value={currentUser.Firstname} onChange={handleEditChange} fullWidth margin="normal" />
            <TextField name="Lastname" label="Last Name" value={currentUser.Lastname} onChange={handleEditChange} fullWidth margin="normal" />
            <TextField name="Middlename" label="Middle Name" value={currentUser.Middlename} onChange={handleEditChange} fullWidth margin="normal" />
            <TextField name="Username" label="Username" value={currentUser.Username} onChange={handleEditChange} fullWidth margin="normal" />
            <TextField name="Password" label="Password" type="password" value={currentUser.Password} onChange={handleEditChange} fullWidth margin="normal" />
            <TextField name="Usertype" label="User Type" value={currentUser.Usertype} onChange={handleEditChange} fullWidth margin="normal" />
            <div className="modal-buttons">
              <Button variant="contained" onClick={handleUpdateUser}>Update</Button>
              <Button variant="contained" onClick={() => setEditModalOpen(false)}>Cancel</Button>
            </div>
          </Box>
        </Modal>
      </main>
    </div>
  );
}

export default UserManagement;