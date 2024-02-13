const mongoose = require("mongoose");

const newsArticleSchema = new mongoose.Schema({
  title: String,
  content: String,
  source: String,
  time: { type: Date, default: Date.now }, // Date field for storing the time
  summary: String, // String field for storing the summary
  keywords: [String], // Array of strings for storing keywords
  topics: [String], // Array of strings for storing topics
});

module.exports = mongoose.model("NewsArticle", newsArticleSchema);