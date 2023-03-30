import React, { useState, useEffect } from "react";
import axios from "axios";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import PersonOutlineTwoToneIcon from "@mui/icons-material/PersonOutlineTwoTone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function Story(props) {
  const [story, setStory] = useState(null);

  useEffect(() => {
    async function fetchStory() {
      const response = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${props.id}.json`
      );
      setStory(response.data);
    }
    fetchStory();
  }, [props.id]);

  if (!story) {
    return <div>Loading...</div>;
  }

  return (
    <div className="list-container">
      <div className="story-info">
        <p className="story-title">
          <span style={{ color: "black" }}>{props.index + 1}.</span>{" "}
          {story.title}
          <span style={{ color: "black" }}> (</span>
          <a href={story.url}>{story.url}</a>
          <span style={{ color: "black" }}>)</span>
        </p>
        <ul className="list">
          <li>
            <div className="icon">
              <FavoriteTwoToneIcon />
              {story.score} points
            </div>
          </li>
          <li>
            <div className="icon">
              <PersonOutlineTwoToneIcon />
              {story.by}
            </div>
          </li>
          <li>
            <div className="icon">
              <AccessTimeIcon />
              {getTimeSince(story.time)}
            </div>
          </li>
          <li>
            <div className="comments">{story.descendants || 0} comments</div>
          </li>
        </ul>
      </div>
    </div>
  );
}

function getTimeSince(time) {
  const seconds = Math.floor(Date.now() / 1000 - time);
  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minutes ago`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} hours ago`;
  } else {
    const days = Math.floor(seconds / 86400);
    return `${days} days ago`;
  }
}

export default Story;
