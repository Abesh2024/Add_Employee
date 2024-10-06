import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("https://add-employee.onrender.com/api/employee/getEmployees");
        const data = await response.json();
        if (response.ok) {
          setEmployees(data.employeeList);
        } else {
          toast.error("Error occurred while fetching employees.");
        }
      } catch (err) {
        toast.error("Error occurred while fetching employees.");
      }
    };

    fetchEmployees();
  }, []);

  const removeEmployee = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this employee?");
    if (isConfirmed) {
      try {
        const response = await fetch("https://add-employee.onrender.com/api/employee/deleteEmployee", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id })
        });
        
        const result = await response.json();
        
        if (response.ok) {
          setEmployees(employees.filter((employee) => employee._id !== id));
          toast.success(result.message || "Employee removed successfully");
        } else {
          toast.error(result.message || "Error deleting employee");
        }
      } catch (error) {
        toast.error("Error occurred while deleting the employee.");
      }
    }
  };

  return (
    <div className='list add flex-col'>
      <p>All Employee List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <p>Name</p>
          <p>Email</p>
          <p>Mobile No</p>
          <p>Designation</p>
          <p>Gender</p>
          <p>Course</p>
          <p>Actions</p>
        </div>
        {employees.map((item) => (
          <div key={item._id} className='list-table-format'>
            <p>{item.name}</p>
            <p>{item.email}</p>
            <p>{item.mobileNo}</p>
            <p>{item.designation}</p>
            <p>{item.gender}</p>
            <p>{item.course}</p>
            <p onClick={() => removeEmployee(item._id)} className='courser'>❌</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
