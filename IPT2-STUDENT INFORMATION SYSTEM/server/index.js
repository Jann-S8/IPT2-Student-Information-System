const express = require("express");
const fs= require("fs");
const cors = require("cors");
const app = express();
const port = 1337;
const Student = require("./models/student.model.js");
const User = require("./models/user.model.js");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/InformationSystem"); 


app.use(cors());
app.use(express.json());

//USERS
app.get("/fetchusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});

// ADD USER
app.post("/addusermongo", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error adding user", error: error.message });
  }
});

// UPDATE USER
app.put("/updateuser/:id", async (req, res) => {
  try {
    const updated = await User.findOneAndUpdate(
      { IDnumber: req.params.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
});

// DELETE USER
app.delete("/deleteuser/:id", async (req, res) => {
  try {
    const deleted = await User.findOneAndDelete({ IDnumber: req.params.id });
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted", user: deleted });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
});


//STUDENTS
let students = [];

app.get("/fetchstudents", async (req, res) => {
    try {
        const allStudents = await Student.find({});
        res.json(allStudents);
    } catch (error) {
        res.status(500).json({ message: "Error fetching students" });
    }
});

app.post("/addstudentmongo", async (req, res) => {

        try {
            const { IDnumber, Firstname, Lastname, Middlename, Course, Year } = req.body;
    
            const newStudent = new Student({ IDnumber, Firstname, Lastname, Middlename, Course, Year });
    
            await newStudent.save();
            return res.status(201).json({ message: "Student added successfully", student: newStudent });
        } catch (error) {
            console.error("Error adding student:", error);
            return res.status(500).json({ message: "Error adding student" });
        }
});

app.put("/updatestudent/:id", async (req, res) => {
    const studentId = req.params.id;
    const updatedData = req.body;

    try {
        const updatedStudent = await Student.findOneAndUpdate(
            { IDnumber: studentId },
            updatedData,
            { new: true }
        );
        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: "Error updating student" });
    }
});


app.delete("/deletestudent/:id", async (req, res) => {
    const studentId = req.params.id;

    try {
        const deletedStudent = await Student.findOneAndDelete({ IDnumber: studentId });
        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json({ message: "Student deleted successfully", deletedStudent });
    } catch (error) {
        res.status(500).json({ message: "Error deleting student" });
    }
});

//LOGIN
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const user = await User.findOne({ 
            Username: username, 
            Password: password 
        });
        
        if (user) {
            res.json({ 
                success: true, 
                userType: user.Usertype, 
                userId: user.IDnumber    
            });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

//REGISTER
app.post('/register', async (req, res) => {
  console.log('Register request received');
  try {
    const { IDnumber, Firstname, Lastname, Middlename, Username, Password, Usertype } = req.body;

    // Create a new user with the provided data
    const newUser = new User({
      IDnumber,
      Firstname,
      Lastname,
      Middlename,
      Username,
      Password,
      Usertype
    });

    // Save the new user to the database
    await newUser.save();

    // Send a success response
    res.status(201).send("User Registered Successfully");
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Server Error");
  }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


