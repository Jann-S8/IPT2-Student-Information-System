import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Modal, TextField, Box
} from "@mui/material";
import Sidebar from "./Sidebar";
import "./UserManagement.css";

function UserManagement() {
  const idRef = useRef();
  const fnameRef = useRef();
  const lnameRef = useRef();
  const mnameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const usertypeRef = useRef();

  const [users, setUsers] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    IDnumber: "",
    Firstname: "",
    Lastname: "",
    Middlename: "",
    Username: "",
    Password: "",
    Usertype: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await axios.get("http://localhost:1337/fetchusers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

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

  function openEditModal(user) {
    setCurrentUser({ ...user, originalID: user.IDnumber });
    setEditModalOpen(true);
  }

  function handleEditChange(event) {
    setCurrentUser({ ...currentUser, [event.target.name]: event.target.value });
  }

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <div className="user-management-container">
      <Sidebar />
      <main className="user-management-content">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center', marginTop: '40px', marginBottom: '20px' }}>
          <Typography variant="h2" style={{ marginBottom: 0 }}>USER MANAGEMENT</Typography>
          <Button variant="contained" color="primary" onClick={() => setAddModalOpen(true)}>
            Add User
          </Button>
        </div>

        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
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
                    <Button variant="contained" color="secondary" size="small" onClick={() => openEditModal(user)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error" size="small" onClick={() => handleDeleteUser(user.IDnumber)} sx={{ ml: 1 }}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)}>
          <Box sx={modalStyle}>
            <Typography variant="h6">Add User</Typography>
            <TextField inputRef={idRef} label="ID Number" fullWidth margin="normal" />
            <TextField inputRef={fnameRef} label="First Name" fullWidth margin="normal" />
            <TextField inputRef={lnameRef} label="Last Name" fullWidth margin="normal" />
            <TextField inputRef={mnameRef} label="Middle Name" fullWidth margin="normal" />
            <TextField inputRef={usernameRef} label="Username" fullWidth margin="normal" />
            <TextField inputRef={passwordRef} label="Password" type="password" fullWidth margin="normal" />
            <TextField inputRef={usertypeRef} label="User Type" fullWidth margin="normal" />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
              <Button variant="contained" onClick={handleAddUser}>Add</Button>
              <Button variant="contained" onClick={() => setAddModalOpen(false)}>Cancel</Button>
            </div>
          </Box>
        </Modal>

        <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
          <Box sx={modalStyle}>
            <Typography variant="h6">Edit User</Typography>
            <TextField 
              name="IDnumber" 
              label="ID Number" 
              value={currentUser.IDnumber} 
              onChange={handleEditChange} 
              fullWidth 
              margin="normal" 
            />
            <TextField 
              name="Firstname" 
              label="First Name" 
              value={currentUser.Firstname} 
              onChange={handleEditChange} 
              fullWidth 
              margin="normal" 
            />
            <TextField 
              name="Lastname" 
              label="Last Name" 
              value={currentUser.Lastname} 
              onChange={handleEditChange} 
              fullWidth 
              margin="normal" 
            />
            <TextField 
              name="Middlename" 
              label="Middle Name" 
              value={currentUser.Middlename} 
              onChange={handleEditChange} 
              fullWidth 
              margin="normal" 
            />
            <TextField 
              name="Username" 
              label="Username" 
              value={currentUser.Username} 
              onChange={handleEditChange} 
              fullWidth 
              margin="normal" 
            />
            <TextField 
              name="Password" 
              label="Password" 
              type="password" 
              value={currentUser.Password}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
              />
              <TextField name="Usertype" label="User Type" value={currentUser.Usertype} onChange={handleEditChange} fullWidth margin="normal" />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
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
