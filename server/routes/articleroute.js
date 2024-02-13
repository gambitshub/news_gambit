const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articlecontroller");

// Controller function to get all articles
router.get("/articles", async (req, res) => {
  try {
    const articles = await NewsArticle.find(); // Retrieve all articles from the database
    res.status(200).json(articles); // Send the articles as a JSON response
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
