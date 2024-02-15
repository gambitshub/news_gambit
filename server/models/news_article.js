// Mongo Database Schema
const mongoose = require("mongoose");

const newsArticleSchema = new mongoose.Schema({
  headline: String,
  link: String,
  description: String,
  time: { type: Date, default: Date.now }, // Date field for storing the time
  summary: String, // String field for storing the summary
  keywords: [String], // Array of strings for storing keywords
  topics: [String], // Array of strings for storing topics
  photoLink: String, // New field for storing the photo link
});

module.exports = mongoose.model("NewsArticle", newsArticleSchema);
