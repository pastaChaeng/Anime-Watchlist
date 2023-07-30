import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';

const Streaming = () => {
  const [streamingLinks, setStreamingLinks] = useState({});
  const episodeId = 'spy-x-family-episode-2'; // Replace this with the desired episode ID

  const fetchStreamingLinks = async () => {
    const url = `https://api.consumet.org/anime/gogoanime/servers/${episodeId}`;
    try {
      const { data } = await axios.get(url);
      setStreamingLinks(data);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  useEffect(() => {
    fetchStreamingLinks();
  }, []);

  return (
    <div>
      {streamingLinks.length > 0 ? (
        <ReactPlayer
          url={streamingLinks[0].url}
          controls={true}
          width="100%"
          height="100%"
        />
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default Streaming;
