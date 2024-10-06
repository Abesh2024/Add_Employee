import './App.css';
import Login from './component/Login';
import SignUp from './component/Signup';
import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from 'react';
import UserContext from './context/UserContext';
import Navbar from './component/Navbar';
import SideBar from './component/Sidebar';
import List from "./pages/List"
import AddEmployee from "./pages/Add";
import { ToastContainer } from "react-toastify";

// ProtectedLayout Component
const ProtectedLayout = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="protected-layout">
      <Navbar />
      <SideBar />
      <div className="content">
        {children}  {/* Manually render the children */}
      </div>
    </div>
  );
};

function App() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/auth" element={!user ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />

       
        <Route path="/" element={
          <ProtectedLayout>
            <List /> {/* Default route after login */}
          </ProtectedLayout>
        } />
        <Route path="/add" element={
          <ProtectedLayout>
            <AddEmployee /> {/* Add Employee page */}
          </ProtectedLayout>
        } />
        <Route path="/list" element={
          <ProtectedLayout>
            <List />
          </ProtectedLayout>
        } />
      </Routes>
    </div>
  );
}

export default App;
