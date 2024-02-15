const puppeteer = require("puppeteer");
const { extractArticles } = require("../server/routes/scrape"); // Adjust the path as needed

// Function to test the scraping logic
describe("Scraping Logic Test", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Extract articles from mock HTML", async () => {
    // Load mock HTML file
    await page.goto(`./mock-html/london-card.html`);

    // Run your extraction logic on the page
    const articles = [];
    await extractArticles(page, '[data-testid="london-article"]', articles);

    // Assert on the extracted articles
    expect(articles.length).toBeGreaterThan(0);
    articles.forEach((article) => {
      expect(article.headline).toBeTruthy();
      expect(article.link).toBeTruthy();
      expect(article.description).toBeTruthy();
      expect(article.photoLink).toBeTruthy();
      expect(article.time).toBeTruthy();
    });
  });
});
