import React from "react";

const Article = ({ article }) => (
  <div className="article">
    {article.photoLink && (
      <img src={article.photoLink} alt="Article" className="article-image" />
    )}
    <div className="article-content">
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="article-link"
      >
        {article.headline}
      </a>
      <p className="article-source">Source: {new URL(article.link).hostname}</p>
    </div>
  </div>
);

export default Article;
