import React, { useState, useEffect } from "react";
import Article from "./article";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchRecentArticles();
  }, []);

  const fetchRecentArticles = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/articles_recent");
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("Error fetching recent articles:", error);
    }
  };

  // Split articles into arrays of up to 14 articles each
  const chunkedArticles = [];
  for (let i = 0; i < Math.min(articles.length, 14 * 3); i += 14) {
    // Adjusted loop condition to only iterate up to 3 chunks
    chunkedArticles.push(articles.slice(i, i + 14));
  }

  return (
    <div className="animated-grid-container">
      {" "}
      {/* Added container for centering */}
      {chunkedArticles.map((chunk, index) => (
        <div key={index} className="animated-grid">
          {chunk.map((article, idx) => (
            <div
              key={idx}
              className={`card${idx === chunk.length - 1 ? " card-wide" : ""}`}
            >
              {article.photoLink && ( // Check if photoLink exists
                <img
                  src={article.photoLink}
                  alt="Article"
                  className="article-image"
                />
              )}
              <Article
                headline={article.headline}
                link={article.link}
                photoLink={article.photoLink} // Pass photoLink to Article component
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
