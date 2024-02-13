const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer-core");
const NewsArticle = require("../models/news_article"); // Import the Mongoose model

// Route to trigger scraping and database insertion
router.get("/", async (req, res) => {
  let browser;
  try {
    // Launch Puppeteer browser
    browser = await puppeteer.launch({
      executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    });

    // Open a new page
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(2 * 60 * 1000);

    // Array to store scraped articles
    const articles = [];

    // Scrape BBC News Articles
    await page.goto("https://www.bbc.com/news");
    await extractArticles(page, '[data-testid="london-article"]', articles);
    await extractArticles(page, '[data-testid="edinburgh-card"]', articles);
    await extractArticles(page, '[data-testid="manchester-card"]', articles);
    await extractArticles(page, '[data-testid="chester-card"]', articles);

    // View scraped articles
    console.log("All Articles:", articles);

    // Insert articles into the database
    await NewsArticle.insertMany(
      articles.map((article) => ({
        title: article.headline,
        content: article.description,
        source: article.source,
        time: new Date().toISOString(), // Ensure each article has a unique timestamp
        summary: article.summary,
        keywords: article.keywords,
        topics: article.topics,
      }))
    );

    // Send response
    res
      .status(200)
      .json({ message: "Scraping and database insertion completed" });
  } catch (error) {
    console.error("Error scraping and inserting articles:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Close the browser after scraping
    await browser?.close();
  }
});

// Function to extract articles from a page
async function extractArticles(page, selector, articles) {
  const newArticles = await page.$$eval(selector, (elements) =>
    elements.map((element) => {
      const headlineElement = element.querySelector(
        '[data-testid="card-headline"]'
      );
      const headline = headlineElement
        ? headlineElement.textContent.trim()
        : null;

      const linkElement = element.querySelector(
        '[data-testid="internal-link"]'
      );
      const link = linkElement ? linkElement.href : null;

      const descriptionElement = element.querySelector(
        '[data-testid="card-description"]'
      );
      const description = descriptionElement
        ? descriptionElement.textContent.trim()
        : null;

      // Add placeholder values for future fields
      const summary = null;
      const keywords = null;
      const topics = null;

      // Assign the current time to each article
      const time = new Date().toISOString();

      return { headline, link, description, time, summary, keywords, topics };
    })
  );

  // Merge new articles with existing ones
  newArticles.forEach((newArticle) => {
    const existingArticleIndex = articles.findIndex(
      (existingArticle) => existingArticle.link === newArticle.link
    );
    if (existingArticleIndex !== -1) {
      if (newArticle.description) {
        articles[existingArticleIndex].description = newArticle.description;
      }
    } else {
      articles.push(newArticle);
    }
  });
}

module.exports = router;
