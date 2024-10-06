import React, { useState, useEffect } from 'react'
import UserContext from "./UserContext.jsx"

const UserContextProvider = ({children}) => {
    const [login, setLogin] = ("login");
    const [user, setUser] = useState(() => {
        // Load user from localStorage if available
        const storedUser = localStorage.getItem("user-threads");
        return storedUser ? JSON.parse(storedUser) : null;
      });
      useEffect(() => {
        // Sync context user state with localStorage whenever it changes
        if (user) {
          localStorage.setItem("user-threads", JSON.stringify(user));
        } else {
          localStorage.removeItem("user-threads"); // Clear localStorage on logout
        }
      }, [user]);
  return (
    <UserContext.Provider value={{login, setLogin, user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
