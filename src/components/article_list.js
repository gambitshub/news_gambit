import React, { useState, useEffect } from "react";
import Article from "./article";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  //   const fetchArticles = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000/api/articles");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch articles");
  //       }
  //       const data = await response.json();
  //       // Limiting articles to 39
  //       const limitedArticles = data.slice(0, 42);
  //       setArticles(limitedArticles);
  //     } catch (error) {
  //       console.error("Error fetching articles:", error);
  //     }
  //   };

  const fetchArticles = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/articles");
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      const data = await response.json();
      // Limiting articles to a multiple of 14
      const limitedArticles = data.slice(
        0,
        Math.min(data.length, 14 * Math.ceil(data.length / 14))
      );
      setArticles(limitedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  //   const fetchArticles = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000/api/articles");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch articles");
  //       }
  //       const data = await response.json();
  //       setArticles(data);
  //     } catch (error) {
  //       console.error("Error fetching articles:", error);
  //     }
  //   };

  // Split articles into arrays of up to 13 articles each
  const chunkedArticles = [];
  for (let i = 0; i < Math.min(articles.length, 42); i += 13) {
    chunkedArticles.push(articles.slice(i, i + 14));
  }

  return (
    <div>
      {chunkedArticles.map((chunk, index) => (
        <div key={index} className="animated-grid">
          {chunk.map((article, idx) => (
            <div
              key={idx}
              className={`card${idx === chunk.length - 1 ? " card-wide" : ""}`}
              style={{ backgroundImage: `url(${article.image})` }}
            >
              <Article headline={article.headline} link={article.link} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
