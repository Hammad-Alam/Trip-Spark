const mongoose = require("mongoose"); // MongoDB object modeling tool
const dotenv = require("dotenv"); // Environment variable management
const path = require("path"); // Path manipulation utility

// Retrieve MongoDB connection URI from environment variables
const mongoURI =
  "mongodb+srv://hammadalam115:00225599aa@cluster0.u7v36.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongo = async () => {
  try {
    // Attempt to connect to MongoDB using mongoose
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB Successfully!");
  } catch (error) {
    // Handle connection errors
    console.log("Error connecting to MongoDB", error);
  }
};

// Export the connectToMongo function
module.exports = connectToMongo;
