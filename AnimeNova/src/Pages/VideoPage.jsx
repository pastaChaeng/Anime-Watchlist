// Import necessary dependencies
import React, { useEffect, useState } from "react";
import axios from "axios";

function VideoPage({ animeId }) {
  // useState hook to store the video link
  const [videoLink, setVideoLink] = useState("");

  useEffect(() => {
    const fetchVideoLink = async () => {
      try {
        // Fetch the video link using the Gogoanime API
        const response = await axios.get(
          `https://api.consumet.org/anime/gogoanime/${animeId}/video`
        );
        // Extract the video link from the API response
        const { videoLink } = response.data;
        setVideoLink(videoLink);
      } catch (error) {
        console.error(error);
        // Handle any errors that occur during fetching the video link
      }
    };

    fetchVideoLink(); // Fetch the video link when the Video Page component mounts
  }, [animeId]);

  return (
    <div>
      {videoLink ? (
        <video src={videoLink} controls autoPlay>
          Sorry, your browser doesn't support embedded videos.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
}

export default VideoPage;
