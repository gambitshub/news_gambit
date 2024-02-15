const Article = require("../models/news_article");

// Controller function to get all articles
async function getAllArticles(req, res) {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller function to get the most recent 50 articles sorted by time
async function getRecentArticles(req, res) {
  try {
    console.log("Fetching recent articles...");

    // Fetch the most recent 50 articles sorted by time in descending order
    const articles = await Article.find().sort({ time: -1 }).limit(50);

    if (articles.length > 0) {
      console.log("Recent articles found:", articles);
    } else {
      console.log("No recent articles found.");
    }

    res.status(200).json(articles);
  } catch (error) {
    console.error("Error fetching recent articles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller function to fetch filtered articles
exports.getFilteredArticles = async (req, res) => {
  try {
    let query = {}; // Initialize empty query object

    // Check if source parameter is provided in the query
    if (req.query.source) {
      query.source = req.query.source; // Add source criteria to the query
    }

    // Check if time parameter is provided in the query
    if (req.query.time) {
      query.time = { $gte: new Date(req.query.time) }; // Add time criteria to the query
    }

    const articles = await Article.find(query); // Find articles matching the query
    res.json(articles); // Send the filtered articles as response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Controller function to create a new article
async function createArticle(req, res) {
  try {
    const newArticle = await Article.create(req.body);
    res.status(201).json(newArticle);
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller function to update an existing article
async function updateArticle(req, res) {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedArticle);
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller function to delete an article
async function deleteArticle(req, res) {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllArticles,
  getRecentArticles,
  createArticle,
  updateArticle,
  deleteArticle,
};
