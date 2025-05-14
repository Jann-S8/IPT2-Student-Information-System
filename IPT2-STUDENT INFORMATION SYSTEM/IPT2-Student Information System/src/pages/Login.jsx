import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Button from '@mui/material/Button';
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignIn() {
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const response = await axios.post("http://localhost:1337/login", { 
        username, 
        password 
      });
      
      if (response.data.success) {
        navigate("/dashboard");
      } else {
        setError("Invalid username or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="loginPage"> 
      <div className="login">
        <h1>Login</h1>
        <input 
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="error-message">{error}</div>}
        
        <Button 
          variant="contained" 
          onClick={handleSignIn}
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>

        <Button 
          variant="contained" 
          onClick={() => navigate("/register")}
          disabled={isLoading}
        >
          Register
        </Button>
      </div>
    </div>
  );
}

export default Login;
