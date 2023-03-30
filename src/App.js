import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Story from "./components/Story";
import Header from "./components/Header";

function App() {
  const [storyIds, setStoryIds] = useState([]);

  useEffect(() => {
    async function fetchTopStories() {
      const response = await axios.get(
        "https://hacker-news.firebaseio.com/v0/topstories.json"
      );
      setStoryIds(response.data.slice(0, 10)); // Get first 10 ids
    }
    fetchTopStories();
  }, []);

  return (
    <div className="news-container">
      <Header />
      {storyIds.map((id, index) => (
        <Story key={id} id={id} index={index} />
      ))}
    </div>
  );
}

export default App;
