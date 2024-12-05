import React from "react";
import '../NewsItem.css'; // Custom CSS for NewsItem styling

function NewsItem(props) {
  const { desc, title, imageURL, newsUrl, sourceName } = props;

  return (
    <div className="news-card shadow-sm">
      <img src={imageURL} className="card-img-top" alt="News" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="w-100 fs-6 text-body-secondary text-end">
          - {sourceName}
        </p>
        <p className="card-text">{desc}</p>
        <a
          href={newsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-sm"
        >
          Read More...
        </a>
      </div>
    </div>
  );
}

export default NewsItem;