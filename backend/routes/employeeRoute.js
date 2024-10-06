const express = require("express");
const { getEmployeeList,createEmployee } = require("../controllers/employeeController");
const emproute = express.Router();

emproute.post("/createEmployee", createEmployee);
emproute.get("/getEmployees", getEmployeeList);

module.exports = emproute;