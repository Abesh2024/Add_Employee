const adminModel = require("../models/adminModel.js");
const bcrypt = require("bcrypt");
const { JsonWebTokenError } = require("jsonwebtoken");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "15d" })
}

const registerAdmin = async(req,res) => {
    const { userName, email, password } = req.body;
    const data = req.body;
    // console.log(req.body);
    const admin = await adminModel.findOne({email});
    if (admin) {
        return res.json({
            error:"Admin with this email already exists. 😊"
        })
    }
    if (!validator.isEmail(email)) {
        return res.json({
            error:"Please Enter a valid Email!"
        })
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newAdmin = new adminModel({ userName: userName, email: email, password: hashPassword });
    const user=await newAdmin.save();
    const token = createToken(user._id);
    
    res.cookie("admin",token,{
        maxAge: 15 * 24 * 60 * 60 * 1000,  //ms
        sameSite: 'none',
        secure: true,
        path: '/',
        // httpOnly: true 
       })
    
     res.json({
         message: "Sign up successfully",
         token,
         user,
    })
}
const logInAdmin = async (req, res) => {
    const { email, password } = req.body;
    
    try {
      // Check if the user exists
      const user = await adminModel.findOne({ email });
      if (!user) {
        return res.status(400).json({
          error: "User not found. Please register first.",
        });
      }
  
      // Check if the password is correct
      const passwordMatched = await bcrypt.compare(password, user.password);
      if (!passwordMatched) {
        return res.status(401).json({
          error: "Invalid Credentials! Please try again.",
        });
      }
  
      // Create JWT token
      const token = createToken(user._id);
  
      // Set token as a cookie
      res.cookie("admin", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,  // Cookie expiration time: 15 days
        sameSite: 'none',                  // Cross-site cookie
        secure: true,                      // Cookie only sent over HTTPS
        path: '/',                         // Path where the cookie is accessible
        httpOnly: true                     // Prevent client-side JavaScript from accessing the cookie
      });
  
      // Send the response with token and user info
      res.status(200).json({
        message: "Login Successful!",
        token,
        user: {
          id: user._id,
          email: user.email,
          userName: user.userName,
        },
      });
      
    } catch (error) {
      // Handle server errors
      res.status(500).json({
        message: "An error occurred during login.",
        error: error.message,
      });
    }
  };
  
  const logOutAdmin = async (req, res) => {
    try {
        res.clearCookie("admin", {
            path: "/",
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        res.status(200).json({
            message: "Logged out Successfully!",
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports={registerAdmin,logInAdmin,logOutAdmin}