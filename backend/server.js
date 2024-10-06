const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors"); // Step 1: Require cors
const router = require('./routes/authRoutes.js');
const emproute = require("./routes/employeeRoute.js");

dotenv.config();
const app = express();

app.use(express.json());

// Step 2: Configure CORS
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend's URL
  credentials: true, // This allows cookies to be sent from the frontend
};
app.use(cors(corsOptions)); // Step 3: Use cors middleware

app.use("/api/auth", router);
app.use("/api/employee", emproute);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is up and running on port ${process.env.PORT}`);
});
