import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { Link } from 'react-router-dom';


const SignUp = () => {
  const { setUser } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, email, password } = formData;

    try {
      const res = await fetch(`https://add-employee.onrender.com/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, email, password }),
        credentials: 'include',
      });

      const data = await res.json();
      console.log(data.finalAdmin, "this is sign up admin data");
            

      if (data.error) {
        alert(`Error: ${data.error}`);
        return;
      }

      // Store user data in local storage and context
      localStorage.setItem("user-threads", JSON.stringify(data.finalAdmin));
      setUser(data);
      console.log(data);

      alert("User signed up successfully!");

    } catch (error) {
      console.error("Sign-Up Error:", error);
      alert("An error occurred during sign-up.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>User Name</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'} // Change input type based on showPassword state
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ paddingRight: '50px' }} // Adjust padding to make space for the toggle button
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                height: '100%',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <button type="submit" className="signup-btn">
          Sign Up
        </button>
      </form>
      <p  className="mt-6 text-center text-tomato">
                    Already registered?{" "}
                    <Link to="/Login" className="text-tomato font-bold hover:underline">
                        Login here
                    </Link>
                </p>
    </div>
  );
};

export default SignUp;
