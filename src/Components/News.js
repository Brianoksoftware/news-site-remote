import React, { useState, useEffect, useCallback } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "./Images/News1.png"; // Placeholder image for articles without an image
import '../News.css'; // Custom CSS for styling

function News(props) {
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  const API_KEY = '9a731a3291da8a53eceb4aa1e3dc3e08'; // Your provided API key

  const fetchNews = useCallback(async () => {
    try {
      const url = `https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=${API_KEY}&page=${page}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const parsedData = await response.json();
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalArticles); // Assuming the total results property is named "totalArticles" in this API
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
      const url = `https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=${API_KEY}&page=${nextPage}`;
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
          <b>END...</b>
        </p>
      }
    >
      <div className="container my-4">
        <h2 className="text-center mb-4">Latest News</h2>
        <div className="row">
          {articles.map((element, index) => (
            <div className="col-md-4 mb-4" key={element.url + index}> 
              <NewsItem
                sourceName={element.source.name} // Assuming the source name is under "source.name"
                title={element.title}
                desc={element.description}
                imageURL={element.image} // Assuming the image URL property is named "image" in this API
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