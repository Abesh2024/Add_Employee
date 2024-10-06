const mongoose = require("mongoose");

const employeeModel = new mongoose.Schema({
    name: {
        type: String,
        require:true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    }, mobileno: {
        type: Number,
        require:true,
    }, designation: {
        type: String,
        require:true,
    }, gender: {
        type: String,
        require:true,
    }, course: {
        type: String,
        require:true,
    }
})

const Employee = mongoose.model("employee", employeeModel);

module.exports=Employee;