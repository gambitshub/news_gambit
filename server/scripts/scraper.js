const puppeteer = require("puppeteer-core");

// Function to extract articles from a page
async function extractArticles(page, selector, articles) {
  // Debugging: Log the selector
  console.log("Selector:", selector);
  // Generate a unique timestamp
  const currentTime = new Date().toISOString();

  const newArticles = await page.$$eval(
    selector,
    (elements, currentTime) =>
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
        // const time = currentTime;
        const time = new Date().toISOString();
        console.log("Time for article:", time); // Add this line for debugging
        const summary = null;
        const keywords = null;
        const topics = null;

        return { headline, link, description, time, summary, keywords, topics };
      }),
    currentTime
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
  //   // Merge new articles with existing ones
  //   newArticles.forEach((newArticle) => {
  //     const existingArticleIndex = articles.findIndex(
  //       (existingArticle) => existingArticle.link === newArticle.link
  //     );
  //     if (existingArticleIndex !== -1) {
  //       // Merge new fields with existing article
  //       Object.assign(articles[existingArticleIndex], newArticle);
  //     } else {
  //       articles.push(newArticle);
  //     }
  //   });
}

// Main function to run the scraper
async function run() {
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

    // Scrape articles from your local news website

    // View scraped articles
    console.log("All Articles:", articles);

    // Database Operations

    return;
  } catch (e) {
    console.error("Scrape failed", e);
  } finally {
    // Close the browser after scraping
    await browser?.close();
  }
}

// Run the scraper
run();
