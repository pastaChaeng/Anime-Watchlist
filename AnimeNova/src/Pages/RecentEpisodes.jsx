import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import ReactPlayer from 'react-player/youtube';

const EpisodeItem = ({ item, isLatestEpisode, handleEpisodeClick }) => {
  const handleEpisodeButtonClick = (e) => {
    e.stopPropagation();
    handleEpisodeClick(item.videoUrl, item.id);
  };

  return (
    <div
      className="text-white w-full p-2 cursor-pointer"
      key={item.id}
      onClick={() => handleEpisodeClick(item.videoUrl, item.id)}
    >
      <img
        className="w-full max-auto rounded-lg h-[300px] object-cover"
        src={item.image}
        alt={item.title}
      />
      <p className="font-Poppins text-sm">{item.title}</p>
      <p className="text-white mt-2">
        {isLatestEpisode ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleEpisodeButtonClick}
          >
            Latest Episode
          </button>
        ) : (
          `Episode: ${item.episode}`
        )}
      </p>
    </div>
  );
};

const RecentEpisodes = () => {
  const [apiData, setApiData] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');
  const [streamingLinks, setStreamingLinks] = useState({});
  const [latestEpisode, setLatestEpisode] = useState(null);

  const url = "https://api.consumet.org/anime/gogoanime/recent-episodes";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(url, { params: { page: 1, type: 1 } });
        setApiData(data.results || []);
        setNotFound(data.results && data.results.length === 0);

        // Assuming the latest episode is the first one in the data
        if (data.results && data.results.length > 0) {
          setLatestEpisode(data.results[0]);
        }
      } catch (err) {
        throw new Error(err.message);
      }
    };

    fetchData();
  }, []);

  // Function to fetch streaming links for a specific episode
  const getStreamingLinks = async () => {
    const url = `https://api.consumet.org/anime/gogoanime/watch/spy-x-family-episode-1`;
    try {
      const { data } = await axios.get(url, { params: { server: 'gogocdn' } });
      return data; // Assuming that the API response contains the streaming link
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleEpisodeClick = async (videoUrl, episodeId) => {
    setSelectedVideoUrl(videoUrl);

    // Fetch streaming links if not already fetched for this episode
    if (!streamingLinks[episodeId]) {
      try {
        const links = await getStreamingLinks(episodeId);
        setStreamingLinks((prevLinks) => ({
          ...prevLinks,
          [episodeId]: links,
        }));
      } catch (err) {
        console.error('Error fetching streaming links:', err.message);
      }
    }
  };

  const handleCloseModal = () => {
    setSelectedVideoUrl('');
  };

  return (
    <div>
      <div className='px-6'>
        <h1 className="font-Poppins font-bold text-[900] text-white text-[2.55rem] pt-8">
          Recent Episodes
        </h1>
        <Slider {...sliderSettings}>
          {notFound ? (
            <p>No recent episodes found.</p>
          ) : (
            apiData.map((item, index) => (
              <EpisodeItem
                item={item}
                key={item.id}
                isLatestEpisode={index === 0} // Check if it's the latest episode (first in the list)
                handleEpisodeClick={handleEpisodeClick}
              />
            ))
          )}
        </Slider>
      </div>
      {/* Video Player Modal */}
      {selectedVideoUrl && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-90 flex justify-center items-center">
          <div className="relative w-5/6 h-5/6">
            {streamingLinks[selectedVideoUrl] ? (
              <ReactPlayer
                url={streamingLinks[selectedVideoUrl]}
                controls={true}
                width="50px"
                height="50%"
              />
            ) : (
              <p className="text-white">Loading video...</p>
            )}
            <button
              className="absolute top-2 right-2 text-white text-2xl cursor-pointer"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentEpisodes;
