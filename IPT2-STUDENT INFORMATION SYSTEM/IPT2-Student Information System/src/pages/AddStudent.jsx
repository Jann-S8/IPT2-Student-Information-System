// AddStudent.jsx
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Modal,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import Sidebar from "./Sidebar";
import "./AddStudent.css"; // CSS file included here

function AddStudent() {
  const idRef = useRef();
  const fnameRef = useRef();
  const lnameRef = useRef();
  const mnameRef = useRef();
  const courseRef = useRef();
  const yearRef = useRef();

  const [students, setStudents] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({
    IDnumber: "",
    Firstname: "",
    Lastname: "",
    Middlename: "",
    Course: "",
    Year: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    try {
      const response = await axios.get("http://localhost:1337/fetchstudents");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }

  function isNumericOnly(value) {
    return /^\d+$/.test(value);
  }

  function isLettersOnly(value) {
    return /^[A-Za-z\s]+$/.test(value);
  }

  async function handleAddStudent() {
    const id = idRef.current.value.trim();
    const first = fnameRef.current.value.trim();
    const last = lnameRef.current.value.trim();
    const middle = mnameRef.current.value.trim();
    const course = courseRef.current.value.trim();
    const year = yearRef.current.value.trim();

    if (!isNumericOnly(id)) {
      alert("ID Number should contain numbers only.");
      return;
    }

    if (!isLettersOnly(first) || !isLettersOnly(last) || !isLettersOnly(middle) || !isLettersOnly(course)) {
      alert("Name fields and course should contain letters only.");
      return;
    }

    if (!isNumericOnly(year)) {
      alert("Year should contain numbers only.");
      return;
    }

    const studentData = {
      IDnumber: id,
      Firstname: first,
      Lastname: last,
      Middlename: middle,
      Course: course,
      Year: year,
    };

    try {
      await axios.post("http://localhost:1337/addstudentmongo", studentData);
      fetchStudents();
      setAddModalOpen(false);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  }

  async function handleUpdateStudent() {
    const { IDnumber, Firstname, Lastname, Middlename, Course, Year } = currentStudent;

    if (!isNumericOnly(IDnumber) || !isNumericOnly(Year)) {
      alert("ID Number and Year should contain numbers only.");
      return;
    }

    if (!isLettersOnly(Firstname) || !isLettersOnly(Lastname) || !isLettersOnly(Middlename) || !isLettersOnly(Course)) {
      alert("Name fields and course should contain letters only.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:1337/updatestudent/${currentStudent.originalID}`,
        currentStudent
      );
      fetchStudents();
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  }

  function openEditModal(student) {
    setCurrentStudent({ ...student, originalID: student.IDnumber });
    setEditModalOpen(true);
  }

  async function handleDeleteStudent(id) {
    try {
      await axios.delete(`http://localhost:1337/deletestudent/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  }

  function handleEditChange(event) {
    setCurrentStudent({
      ...currentStudent,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div className="add-student-container">
      <Sidebar />
      <main className="content">
        <div className="header-section">
          <h2>STUDENT INFORMATION</h2>
          <Button variant="contained" color="primary" onClick={() => setAddModalOpen(true)}>
            Add Student
          </Button>
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID Number</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Middle Name</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.IDnumber}>
                  <TableCell>{student.IDnumber}</TableCell>
                  <TableCell>{student.Firstname}</TableCell>
                  <TableCell>{student.Lastname}</TableCell>
                  <TableCell>{student.Middlename}</TableCell>
                  <TableCell>{student.Course}</TableCell>
                  <TableCell>{student.Year}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" size="small" onClick={() => openEditModal(student)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error" size="small" onClick={() => handleDeleteStudent(student.IDnumber)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)}>
          <Box className="modal-box">
            <Typography variant="h6">Add Student</Typography>
            <TextField inputRef={idRef} label="ID Number" fullWidth margin="normal" />
            <TextField inputRef={fnameRef} label="First Name" fullWidth margin="normal" />
            <TextField inputRef={lnameRef} label="Last Name" fullWidth margin="normal" />
            <TextField inputRef={mnameRef} label="Middle Name" fullWidth margin="normal" />
            <TextField inputRef={courseRef} label="Course" fullWidth margin="normal" />
            <TextField inputRef={yearRef} label="Year" fullWidth margin="normal" />
            <Button variant="contained" color="primary" fullWidth onClick={handleAddStudent}>
              Add Student
            </Button>
          </Box>
        </Modal>

        <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
          <Box className="modal-box">
            <Typography variant="h6">Edit Student</Typography>
            <TextField name="IDnumber" label="ID Number" fullWidth margin="normal" value={currentStudent.IDnumber} onChange={handleEditChange} />
            <TextField name="Firstname" label="First Name" fullWidth margin="normal" value={currentStudent.Firstname} onChange={handleEditChange} />
            <TextField name="Lastname" label="Last Name" fullWidth margin="normal" value={currentStudent.Lastname} onChange={handleEditChange} />
            <TextField name="Middlename" label="Middle Name" fullWidth margin="normal" value={currentStudent.Middlename} onChange={handleEditChange} />
            <TextField name="Course" label="Course" fullWidth margin="normal" value={currentStudent.Course} onChange={handleEditChange} />
            <TextField name="Year" label="Year" fullWidth margin="normal" value={currentStudent.Year} onChange={handleEditChange} />
            <Button variant="contained" color="primary" fullWidth onClick={handleUpdateStudent}>
              Update Student
            </Button>
          </Box>
        </Modal>
      </main>
    </div>
  );
}

export default AddStudent;
