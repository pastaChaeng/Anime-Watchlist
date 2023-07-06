import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Topairing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [apiData, setApiData] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchQuery === "") {
          const response = await axios.get(
            "https://api.consumet.org/anime/gogoanime/top-airing",
            {
              params: { page: 1 },
            }
          );
          setApiData(response.data);
          setNotFound(false);
        } else {
          const responsePage1 = await axios.get(
            `https://api.consumet.org/anime/gogoanime/${searchQuery}?page=1`
          );
          const responsePage2 = await axios.get(
            `https://api.consumet.org/anime/gogoanime/${searchQuery}?page=2`
          );
          const responsePage3 = await axios.get(
            `https://api.consumet.org/anime/gogoanime/${searchQuery}?page=3`
          );

          const mergedData = {
            results: [
              ...responsePage1.data.results,
              ...responsePage2.data.results,
              ...responsePage3.data.results,
            ],
          };

          if (mergedData.results.length > 0) {
            setApiData(mergedData);
            setNotFound(false);
          } else {
            setNotFound(true);
            setApiData([]);
          }
        }
      } catch (error) {
        console.error(error);
        setApiData([]);
        setNotFound(true);
      }
    };

    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    fetchData();

    return () => {
      clearInterval(interval);
    };
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const bannerSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const airingSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: false,
  };

  const bannerImages = {
    Demonslayer: "https://wallpapercave.com/wp/wp7836447.png",
    Bleach: "https://images.alphacoders.com/118/1184490.jpg",
    wotakoi: "https://wallpaperaccess.com/full/2891515.png",
  };

  return (
    <div>
      <header className="flex justify-between items-center m-0 bg-[#192026] p-4">
        <div className="flex justify-center items-center gap-4">
        <img src="https://example.com/react-logo.png" className="App-logo" alt="logo" />
    
          <nav>
            <ul className="flex gap-5 font-Poppins font-[400] text-white">
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Recent Episodes</a>
              </li>
              <li>
                <a>Recent Episodes</a>
              </li>
              <li>
                <a>Genre</a>
              </li>
            </ul>
          </nav>
        </div>
        <div></div>
        <form>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="font-Poppins p-4 pl-10 text-sm text-white rounded-lg bg-[#374151] focus:outline-none focus:text-white dark:focus:bg-gray-800 dark:focus:text-white dark:bg-gray-700 dark:text-gray-300"
              placeholder="Search Anime"
              required
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </form>
      </header>
      <div className="px-5">
        <div>
          <Slider {...bannerSettings}>
            {Object.entries(bannerImages).map(([key, value]) => (
              <div className="relative" key={key}>
                <img src={value} className="w-full h-[400px] border-none" alt="Image" />
                <div className="absolute top-1/2 left-4">
                  <h2 className="text-white text-4xl font-Poppins font-bold z-10">{key}</h2>
                  <button className="mt-4 border-none bg-[#00008b] text-white font-Poppins px-4 py-2 rounded-sm font-semibold">
                    WATCH NOW
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <h1 className="font-Poppins font-bold text-[900] text-white text-[2.55rem]">
          Top Airing
        </h1>
        <Slider {...airingSettings}>
          {notFound ? (
            <p>No anime found.</p>
          ) : (
            apiData.results &&
            apiData.results.map((item) => (
              <div className="text-white w-full p-2" key={item.id}>
                <img
                  className="w-full rounded-lg h-[300px]"
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
}

export default Topairing;
