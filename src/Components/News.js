import React, { useState, useEffect, useCallback } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "./Images/News1.png";

function News(props) {
  let category = props.category;
  let [articles, setArticles] = useState([]);
  let [totalResults, setTotalResults] = useState(0);
  let [page, setPage] = useState(1);

  // Fetch initial news
  let resultNews = useCallback(async () => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&page=${page}&apiKey=ecfaf9eaaa8d40a5b5d769210f5ee616`;
      console.log(`Fetching data from: ${url}`);

      let data = await fetch(url);
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }

      let parsedData = await data.json();
      console.log("Fetched initial data:", parsedData);

      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
    } catch (error) {
      console.error("Error fetching initial news data:", error);
    }
  }, [category, page]);

  useEffect(() => {
    resultNews();
  }, [resultNews]);

  // Fetch additional data for infinite scroll
  let fetchData = async () => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&page=${page + 1}&apiKey=ecfaf9eaaa8d40a5b5d769210f5ee616`;
      console.log(`Fetching data from: ${url}`);

      let data = await fetch(url);
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }

      let parsedData = await data.json();
      console.log("Fetched paginated data:", parsedData);

      setPage(page + 1);
      setArticles(articles.concat(parsedData.articles));
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
      <div className="container my-3">
        <div className="row">
          {articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                sourceName={element.source.name}
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
