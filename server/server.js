const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
const scrapeRouter = require("./routes/scrape"); // Import the scraping route
const articleRouter = require("./routes/articleroute"); // Import the route file

// Initialize Express app
const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/my_database", {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define routes
app.use("/scrape", scrapeRouter); // Use the scraping route

// Schedule scraping to run every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  console.log("Running scraper...");
  try {
    // Call the scraping route programmatically
    await fetch("http://localhost:5000/scrape", { method: "GET" });
  } catch (error) {
    console.error("Error running scraper:", error);
  }
});

// Mount the article route
app.use("/api", articleRouter); // Mount the route at /api/articles

// Define a route to make a GET request to /api/articles/articles and log the response
app.get("/test/articles", async (req, res) => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/articles/articles",
      { method: "GET" }
    );
    const data = await response.json();
    console.log("Articles:", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
// Check port number here
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
