const express = require("express");
const {registerAdmin,logInAdmin,logOutAdmin}=require("../controllers/authController.js")
const router = express.Router();

router.post("/signup",registerAdmin)
router.post("/login", logInAdmin);
router.post("/logout",logOutAdmin)
module.exports = router;