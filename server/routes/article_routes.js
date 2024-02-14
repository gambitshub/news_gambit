const express = require("express");
const router = express.Router();
const articleController = require("../controllers/article_controller");

// Import your controller function for fetching articles
const { getAllArticles } = require("../controllers/article_controller");

// Define the route to fetch all articles
router.get("/articles", getAllArticles);

module.exports = router;

// // GET all articles
// router.get("/articles", articleController.getAllArticles);

// // Route to fetch articles with optional filtering
// router.get("/articles", articleController.getFilteredArticles);

// // POST a new article
// router.post("/articles", articleController.createArticle);

// // PUT/PATCH an existing article
// router.put("/articles/:id", articleController.updateArticle);

// // DELETE an article
// router.delete("/articles/:id", articleController.deleteArticle);

// module.exports = router;
