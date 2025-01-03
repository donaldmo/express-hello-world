const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests

// In-memory user data for demonstration
const users = {
  testuser: {
    password: "password123",
    profile: { username: "testuser", email: "testuser@example.com" },
  },
};

// Authentication middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (token === "validAuthToken") {
    next(); // Token is valid, proceed
  } else {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// Serve React static files (build folder)
app.use(express.static(path.join(__dirname, "dashboard/build")));

// Login API endpoint
app.post("/api/login", (req, res) => {
  console.log(':: /api/login:', req)
  const { username, password } = req.body;

  // Validate user credentials
  if (users[username] && users[username].password === password) {
    // Simulate token creation (in production, use a secure method like JWT)
    return res.json({ authToken: "validAuthToken" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

// Profile API endpoint (protected)
app.get("/api/profile", authenticate, (req, res) => {
  const profileData = users["testuser"].profile;
  if (profileData) {
    return res.json(profileData);
  } else {
    return res.status(404).json({ message: "Profile not found" });
  }
});

// Catch-all to serve React app for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dashboard/build", "index.html"));
});

// Start the server
const port = process.env.PORT || 4800;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
