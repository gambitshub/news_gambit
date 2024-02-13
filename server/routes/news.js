const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");

// Route to fetch all news articles
router.get("/articles", newsController.getAllArticles);

module.exports = router;
