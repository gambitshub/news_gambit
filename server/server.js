// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
const fetch = require("node-fetch"); // Import the fetch module to make HTTP requests
const scrapeRouter = require("./routes/scrape"); // Import the scraping route
const articleRouter = require("./routes/articleroute"); // Import the route file

// Initialize Express app
const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/my_database", {}) // Connect to MongoDB at the specified URI
  .then(() => console.log("MongoDB connected")) // Log a success message if connection is established
  .catch((err) => console.error("MongoDB connection error:", err)); // Log an error message if connection fails

// Define routes
app.use("/scrape", scrapeRouter); // Use the scraping route at '/scrape'

// Schedule scraping to run every 5 minutes
cron.schedule("* * * * *", async () => {
  // Schedule a task to run every 5 minutes
  console.log("Running scraper..."); // Log a message indicating that the scraper is running
  try {
    // Call the scraping route programmatically
    await fetch("http://localhost:5000/scrape", { method: "GET" }); // Make a GET request to the scraping route
  } catch (error) {
    console.error("Error running scraper:", error); // Log an error message if the scraping request fails
  }
});

// // Mount the article route
// app.use("/api", articleRouter); // Mount the route at '/api'

// // Define a route to make a GET request to fetch articles
// app.get("/test/articles", async (req, res) => {
//   // Define a route for handling GET requests to '/test/articles'
//   try {
//     // Make a GET request to fetch articles from the article route
//     const response = await fetch(
//       "http://localhost:5000/api/articles/articles",
//       { method: "GET" }
//     );
//     const data = await response.json(); // Parse the JSON response
//     console.log("Articles:", data); // Log the fetched articles to the console
//     res.status(200).json(data); // Send the fetched articles as JSON response
//   } catch (error) {
//     console.error("Error fetching articles:", error); // Log an error message if fetching articles fails
//     res.status(500).json({ error: "Internal server error" }); // Send an error response
//   }
// });

// Start the server
const PORT = process.env.PORT || 5000; // Set the port number for the server
app.listen(PORT, () => {
  // Start the server and listen on the specified port
  console.log(`Server is running on port ${PORT}`); // Log a message indicating that the server is running
});
