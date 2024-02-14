// Import required modules
const express = require("express"); // Express framework
const mongoose = require("mongoose"); // ODM library
const cron = require("node-cron"); // Task scheduling
const fetch = require("node-fetch"); // HTTP requests
const scrapeRouter = require("./routes/scrape"); // Web news scraping route
const cors = require("cors");
// const articleRouter = require("./routes/articleroute"); // Import the route file
const articleRoutes = require("./routes/article_routes");

// Initialize Express app instance
const app = express();

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB database
mongoose
  .connect("mongodb://localhost:27017/my_database", {}) // Connect to MongoDB at the specified URI
  .then(() => console.log("MongoDB connected")) // Log success message
  .catch((err) => console.error("MongoDB connection error:", err)); // Log error message

// Define routes
app.use("/scrape", scrapeRouter); // Use the scraping route at '/scrape'

// Schedule scraping to run every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  // Schedule a task to run every 5 minutes
  console.log("Running scraper..."); // Log a message indicating that the scraper is running
  try {
    // Call the scraping route
    await fetch("http://localhost:5000/scrape", { method: "GET" }); // Make GET request to the scraping route
  } catch (error) {
    console.error("Error running scraper:", error); // Log error message if the scraping request fails
  }
});

// Mount the article route
app.use("/api", articleRoutes);

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
