// Import required modules
const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer-core");
const NewsArticle = require("../models/news_article");

// Define the list of sources and their corresponding selectors
const sources = [
  {
    url: "https://www.bbc.com/news",
    selectors: [
      '[data-testid="london-article"]',
      '[data-testid="edinburgh-card"]',
      '[data-testid="manchester-card"]',
      '[data-testid="chester-card"]',
    ],
  },
  // Add more sources here if needed in the future
];

// Define GET route to trigger scraping and database insertion
router.get("/", async (req, res) => {
  let browser;
  console.log("Scrape routine running from scrape.js");
  try {
    // Launch Puppeteer browser
    browser = await puppeteer.launch({
      executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    });

    // Loop through each source
    for (const source of sources) {
      // Open a new page for the current source
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(2 * 60 * 1000); // Set timeout for navigation

      // Array to store scraped articles
      const articles = [];

      // Scrape articles for the current source
      await page.goto(source.url);
      for (const selector of source.selectors) {
        await extractArticles(page, selector, articles);
      }

      // Insert articles into the database, preventing duplicates based on link
      await processAndInsertArticles(articles);
    }

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

// Function to extract articles from a page using CSS selectors
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

      const photoLinkElement = element.querySelector(
        '[data-testid="card-media"] img'
      );
      let photoLink = null;
      if (photoLinkElement) {
        const srcset = photoLinkElement.getAttribute("srcset");
        if (srcset) {
          // Parse srcset and find the largest image URL
          const urls = srcset
            .split(", ")
            .map((entry) => entry.trim().split(" ")[0]);
          photoLink = urls[urls.length - 1]; // Select the last URL as it's usually the largest
        } else {
          photoLink = photoLinkElement.getAttribute("src");
        }
      }

      // Assign the current time to each article
      const time = new Date().toISOString();

      return { headline, link, description, time, photoLink };
    })
  );

  // Filter out articles without a link
  const validArticles = newArticles.filter((article) => article.link);

  // Merge new articles with existing ones
  validArticles.forEach((newArticle) => {
    const existingArticleIndex = articles.findIndex(
      (existingArticle) => existingArticle.link === newArticle.link
    );
    if (existingArticleIndex === -1) {
      articles.push(newArticle);
    }
  });
}

// Export the function for use in other modules
module.exports = {
  extractArticles,
};

// Function to process and insert articles into the database
// Prevents duplicates based on link
async function processAndInsertArticles(articles) {
  for (const article of articles) {
    try {
      // Attempt to find a document with the provided link
      const existingArticle = await NewsArticle.findOne({ link: article.link });

      // If the article doesn't exist, insert it
      if (!existingArticle) {
        const newArticle = await NewsArticle.create(article);
        console.log("New article added to the database:", newArticle);
      }
    } catch (error) {
      console.error("Error processing and inserting article:", error);
    }
  }
}

// Export the router for use in the main app
module.exports = router;
