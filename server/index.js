require("dotenv").config();
const express = require("express");
const app = express();
const connectDb = require("./db/connectDb");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const errorHandler = require("./utils/errorHandler");
const morgan = require("morgan");
const xss = require("xss-clean");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const logger = require('./logger'); // Import the Winston logger
const jwt = require("jsonwebtoken")

app.use(fileUpload());
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use(
  cors({
    origin: "https://localhost:5173",
    credentials: true,
  }),
);
app.use(express.static("public"));
app.use(morgan("dev"));

// Middleware to log requests
app.use(async (req, res, next) => {
  let username = "Anonymous"; // Default username if no token is provided
  // Check if the Authorization header exists
  if (req.headers['authorization']) {
    const token = req.headers['authorization'].split(' ')[1]; // Extract the token
    try {
      // Decode the token to extract the payload
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret
      if(decoded.username){
        username = decoded.username;
      } // Assuming the payload contains a `username` field
    } catch (error) {
      logger.error("Failed to decode token:", error);
    }
  }
  // Log to console (optional)
  logger.info({
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    username: username,
  });
  // Save log to database
  try {
    await Log.create({
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      username: username,
    });
  } catch (error) {
    logger.error("Failed to save log to database:", error);
  }
  next();
});

connectDb();

// importing the api routes
const userRoutes = require("./routes/user");
const projectRoutes = require("./routes/project");
const esewaRoutes = require("./routes/esewa");
const Log = require("./models/logs");

app.use("/api/user", userRoutes);
app.use("/api/project", projectRoutes);
app.use("/api", esewaRoutes);

// Global error handler middleware
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;