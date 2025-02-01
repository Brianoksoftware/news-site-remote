

import React, { useState, useEffect, useCallback } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";
import '../News.css'; 

function News(props) {
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  const API_KEY = '9a731a3291da8a53eceb4aa1e3dc3e08';

  const fetchNews = useCallback(async () => {
    try {
      const url = `https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=${API_KEY}&page=${page}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const parsedData = await response.json();
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalArticles);
    } catch (error) {
      console.error("Error fetching initial news data:", error);
    }
  }, [page, API_KEY]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const fetchData = async () => {
    try {
      const nextPage = page + 1;
      const url = `https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=${API_KEY}&page=${nextPage}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const parsedData = await response.json();
      setArticles(prevArticles => prevArticles.concat(parsedData.articles));
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
      endMessage={<p style={{ textAlign: "center" }}><b>END...</b></p>}
    >


    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">

      <img src="../harambexmas.png" alt="Image Description" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">

     <p style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333; text-align: justify;">
        
        <!--<script type="text/javascript" src="https://vdbaa.com/pup.php?section=General&pt=2&pub=816797&ga=g"></script>  <!--pop up-ish ad-->

      </p>
    </div>



      <div className="container my-4">
        <h2 className="text-center mb-4">Latest News</h2>
        <div className="row news-grid">
          {articles.map((element, index) => (
            <div className="col-md-4 mb-4" key={element.url + index}> 
              <NewsItem
                sourceName={element.source.name}
                title={element.title}
                desc={element.description}
                imageURL={element.image || "placeholder.jpg"} // Default image if no image is available
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


















