import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import { TextField } from "@mui/material";

function Dashboard() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="dash">
      <h1>Welcome to Student Information System</h1>
      <h2>Saint Mary's University</h2>
      
      <Sidebar />
    </div>
  );
}

export default Dashboard;