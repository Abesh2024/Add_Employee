import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Assuming you are using react-router for navigation
import UserContext from "../context/UserContext";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const user = JSON.parse(localStorage.getItem("user-threads"));
  const admin=user.user.userName

  const handleLogout = async () => {
    try {
        const res = await fetch(`https://add-employee.onrender.com/api/auth/logout`, {
            method: "POST",
            credentials: 'include', // Include cookies if needed
        });

        const data = await res.json();

        if (data.message === "Logged out Successfully!") {
            // Remove user data from localStorage
          localStorage.removeItem("user-threads");
          setUser(null);
            
           
        } else {
            alert(`Logout Error: ${data.error || "An error occurred."}`);
        }
    } catch (error) {
        console.error("Logout Error:", error);
        alert("An error occurred during logout.");
    }
};


  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img
          src="https://www.dealsdray.com/wp-content/uploads/2023/11/logo_B2R.png" // Replace with your logo
          alt="Logo"
          style={{ height: "50px", width: "50px" }}
        />
      </div>
     
      <form onSubmit={handleSearch} className="navbar-search">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {/* <button type="submit" className="search-button">
          Search
        </button> */}
      </form>
      <div className="navbar-user">
        {/* Display user's name from local storage */}
        {user ? (
          <p> {admin || "Admin"}</p>
        ) : (
          <p>Log in</p>
        )}
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
