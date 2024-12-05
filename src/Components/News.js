import React, { useState, useEffect, useCallback } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "./Images/News1.png"; // Placeholder image for articles without an image
import '../News.css'; // Custom CSS for styling

function News(props) {
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  
  const API_KEY = '3086b425665d4ad1aa1c562cb1829bd3'; // Your provided API key
  
  const fetchNews = useCallback(async () => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&page=${page}&apiKey=${API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const parsedData = await response.json();
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
    } catch (error) {
      console.error("Error fetching initial news data:", error);
    }
  }, [page, API_KEY]); // Dependencies array includes API_KEY

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const fetchData = async () => {
    try {
      const nextPage = page + 1;
      const url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&page=${nextPage}&apiKey=${API_KEY}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const parsedData = await response.json();
      setArticles((prevArticles) => prevArticles.concat(parsedData.articles));
      setPage(nextPage);
    } catch (error) {
      console.error("Error fetching paginated news data:", error);
    }
  };

  return (
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchData}
      hasMore={articles.length < totalResults}
      loader={<h4 className="text-center">Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className="container my-4">
        <h2 className="text-center mb-4">Latest BBC News</h2>
        <div className="row">
          {articles.map((element) => (
            <div className="col-md-4 mb-4" key={element.url}>
              <NewsItem
                sourceName="BBC News"
                title={element.title}
                desc={element.description}
                imageURL={element.urlToImage ? element.urlToImage : Image}
                newsUrl={element.url}
              />
            </div>
          ))}
        </div>
      </div>
    </InfiniteScroll>
  );
}

export default News;