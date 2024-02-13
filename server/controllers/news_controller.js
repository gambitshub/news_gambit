const NewsArticle = require("../models/NewsArticle");

// Controller function to fetch all news articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await NewsArticle.find();
    res.json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
