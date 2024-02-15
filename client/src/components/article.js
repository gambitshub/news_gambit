import React from "react";

const Article = ({ headline, link }) => (
  <div className="article">
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="article-link"
    >
      {headline}
    </a>
    <p className="article-source">Source: {new URL(link).hostname}</p>
  </div>
);

export default Article;
