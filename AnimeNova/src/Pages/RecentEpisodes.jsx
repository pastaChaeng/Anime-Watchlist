import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick'; 

const RecentEpisodes = () => {
  const [apiData, setApiData] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const url = "https://api.consumet.org/anime/gogoanime/recent-episodes";
  
  // Fetch data from the API 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(url, { params: { page: 1, type: 1 } });
        setApiData(data.results || []);
        setNotFound(data.results && data.results.length === 0);
      } catch (err) {
        throw new Error(err.message);
      }
    };

    fetchData();
  }, []);

  const sliderSettings = {  
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div>
        <div className='px-5'>
      <h1 className="font-Poppins font-bold text-[900] text-white text-[2.55rem]">
        Recent Episodes
      </h1>
      <Slider {...sliderSettings}>
        {notFound ? (
          <p>No recent episodes found.</p>
        ) : (
          apiData.map((item) => (
            <div className="text-white w-full p-2" key={item.id}>
              {/* Display the relevant data from the API */}
              <img
                className="w-full max-auto rounded-lg h-[300px] object-cover"
                src={item.image}
                alt={item.title}
              />
              <p className="font-Poppins text-sm">{item.title}</p>
            </div>
          ))
        )}
      </Slider>
    </div>
    </div>
  );
};

export default RecentEpisodes;
