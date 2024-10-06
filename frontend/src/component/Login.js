import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch(`https://add-employee.onrender.com/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
  
      if (!res.ok) {
        // Handle errors based on status code
        const errorData = await res.json();
        alert(`Error: ${errorData.error}`);
        return;
      }
  
      const data = await res.json();
      console.log(data.finalAdmin, "this is login admin data");
  
      // Store user data in local storage and context
      localStorage.setItem("user-threads", JSON.stringify(data.finalAdmin));
      setUser(data);
  
      alert("User logged in successfully!");
  
    } catch (error) {
      console.error("Login Error:", error);
      alert("An error occurred during login.");
    }
  };
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
      <p className="mt-6 text-center">
        Don't have an account?{" "}
        <Link to="/auth" className="text-blue-500 hover:underline">
          Sign Up here
        </Link>
      </p>
    </div>

  );
};

export default Login;