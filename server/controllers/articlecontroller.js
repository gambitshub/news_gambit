const NewsArticle = require("../models/news_article");

async function getArticles(req, res) {
  try {
    const articles = await NewsArticle.find();
    res.status(200).json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getArticles,
};
