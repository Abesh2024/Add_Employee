import React, { useState } from 'react';
// import './AddEmployee.css';
import axios from 'axios';
import { toast } from 'react-toastify';
// import Navbar from '../component/Navbar';

const AddEmployee = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        mobile: "",
        designation: "",
        gender: "",
        course: ""
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://add-employee.onrender.com/api/employee/createEmployee", data);

            if (response.data.success) {
                setData({
                    name: "",
                    email: "",
                    mobile: "",
                    designation: "",
                    gender: "",
                    course: ""
                });
                // toast(response.data.message);
                alert(response.data.message)
            } else {
                // toast.error(response.data.message);
                alert(response.data.message)
            }
        } catch (error) {
            console.error("Error:", error.message);
            toast.error("An error occurred while adding the employee.");
        }
    };

    return (
        <>
        <div className='add-employee'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="input-group flex-col">
                    <label>Name</label>
                    <input
                        type="text"
                        name='name'
                        value={data.name}
                        placeholder='Enter name'
                        onChange={onChangeHandler}
                        className='employee-name'
                        required
                    />
                </div>
                <div className="input-group flex-col">
                    <label>Email</label>
                    <input
                        type="email"
                        name='email'
                        value={data.email}
                        placeholder='Enter email'
                        onChange={onChangeHandler}
                        className='employee-email'
                        required
                    />
                </div>
                <div className="input-group flex-col">
                    <label>Mobile No</label>
                    <input
                        type="tel"
                        name='mobile'
                        value={data.mobile}
                        placeholder='Enter mobile number'
                        onChange={onChangeHandler}
                        className='employee-mobile'
                        required
                    />
                </div>
                <div className="input-group flex-col">
                    <label>Designation</label>
                    <input
                        type="text"
                        name='designation'
                        value={data.designation}
                        placeholder='Enter designation'
                        onChange={onChangeHandler}
                        className='employee-designation'
                        required
                    />
                </div>
                <div className="input-group flex-col">
                    <label>Gender</label>
                    <select
                        name="gender"
                        value={data.gender}
                        onChange={onChangeHandler}
                        className='employee-gender'
                        required
                    >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="input-group flex-col">
                    <label>Course</label>
                    <input
                        type="text"
                        name='course'
                        value={data.course}
                        placeholder='Enter course'
                        onChange={onChangeHandler}
                        className='employee-course'
                        required
                    />
                </div>
                <button type='submit' className='add-employee-btn'>Add Employee</button>
            </form>
        </div>
        </>
    );
};

export default AddEmployee;
