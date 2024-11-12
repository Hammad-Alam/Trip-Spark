const connectToMongo = require("./db");
const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Define API routes
app.use("/api/auth", require("./routes/auth")); // Authentication routes

// Start server and listen on specified port
app.listen(port, () => {
  console.log(`TripSpark backend listening on port: http://localhost:${port}`);
});

// Establish connection to MongoDB
connectToMongo();
