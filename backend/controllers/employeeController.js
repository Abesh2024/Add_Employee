const Employee = require("../models/Emplyee.js");
const validator = require("validator");

const createEmployee = async (req, res) => {
    const { name, email, mobileno, designation, gender, course } = req.body;
    console.log(req.body);
  try {
    const employeeExist = await Employee.findOne({ email });
      if (employeeExist) {
          return res.json({
              error: "Employee with this Email Id already exist 😊",
          });
      }
    if (!validator.isEmail(email)) {
        return res.json({
          message: "Please Enter a valid Email!",
        });
        }
    const newEmployee = new Employee({ name: name, email: email, mobileno: mobileno, designation: designation, gender: gender, course: course });
    const finalEmp = await newEmployee.save();

        return res.json({
            message: "New Employee Added !",
            finalEmp
        })
    
  } catch (error) {
    res.status(500).json({
        error: "An error occurred during creating.",
        error: error.message,
    })
  }
};
const getEmployeeList = async (req, res) => {
    try {
        // Sort by name alphabetically (ascending) and by createdAt date (descending)
        const employeeList = await Employee.find().sort({ name: 1, createdAt: -1 });

        return res.status(200).json({
            message: "Employee list fetched successfully.",
            employeeList,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error in fetching data.",
            error: error.message,
        });
    }
};

module.exports = { createEmployee, getEmployeeList };
