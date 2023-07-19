import React, { useEffect, useState } from "react";
import axios from "axios";
import reactLogo from "../assets/react.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Topairing() {



  //useState hook to store the search query
  const [searchQuery, setSearchQuery] = useState("");
  //useState hook to store the API response
  const [apiData, setApiData] = useState([]);
  //useState hook to store whether the API returned a 404
  const [notFound, setNotFound] = useState(false);
  //useEffect hook to fetch data from the API

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // If the search query is empty, fetch the top 10 trending anime
        if (searchQuery === "") {
          const response = await axios.get(
            "https://api.consumet.org/anime/gogoanime/top-airing",
            {
              params: { page: 1 },
            }
          );
          setApiData(response.data);
          setNotFound(false);
        }
        // If the search query is not empty, fetch the anime that matches the search query
        else {
          const responsePage1 = axios.get(
            `https://api.consumet.org/anime/gogoanime/${searchQuery}?page=1`
          );
          const responsePage2 = axios.get(
            `https://api.consumet.org/anime/gogoanime/${searchQuery}?page=2`
          );
          const responsePage3 = axios.get(
            `https://api.consumet.org/anime/gogoanime/${searchQuery}?page=3`
          );
          const [page1, page2, page3] = await Promise.all([
            responsePage1,
            responsePage2,
            responsePage3,
          ]);

          const mergedData = {
            results: [
              ...page1.data.results,
              ...page2.data.results,
              ...page3.data.results,
            ],
            // Merge any other properties if necessary
          };

          if (mergedData.results.length > 0) {
            setApiData(mergedData);
            setNotFound(false);
          } else {
            setNotFound(true);
            setApiData([]);
          }
        }
        // If the API returns a 404, set the notFound state to true
      } catch (err) {
        console.error(err);
        setApiData([]);
        setNotFound(true);
      }
    };

    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    fetchData(); // Fetch data initially

    return () => {
      clearInterval(interval);
    };
  }, [searchQuery]);

  // Function to handle the search query
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  //settings for the slider banner
  const banner = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  //settings for the slider top airing
  const topairing = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: false,
  };
  //images for the slider banner
  const Demonslayer = "https://wallpapercave.com/wp/wp7836447.png";
  const Bleach = "https://images.alphacoders.com/118/1184490.jpg";
  const wotakoi = "https://wallpaperaccess.com/full/2891515.png";
  return (
    <div className=" ">
      <header className="flex justify-between items-center m-0 bg-[#192026] p-4">
        <div className="flex justify-center items-center gap-4">
          <img src={"https://cdn-icons-png.flaticon.com/128/2314/2314797.png"} className="App-logo w-8 h-8" alt="logo" />
          <nav>
            <ul className="flex gap-5 font-Poppins font-[400] text-white">
              <li className=" ">
                <a href="#" className="text-blue-500 hover:text-blue-600">Home</a>
              </li>
              <li>
              <a href="/recent-episodes"  className="hover:text-blue-600">Recent Episodes</a>
              </li>
              <li>
                <a href="/recent-episodes" className="hover:text-blue-600">Streaming Links</a>
              </li>
              <li>
                <a href="/recent-episodes" className="hover:text-blue-600">Genre</a>
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
          <div className="relative  ">
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
              className="font-Poppins   p-4 pl-10 text-sm text-white  rounded-lg bg-[#374151]  focus:outline-none  focus:text-white dark:focus:bg-gray-800 dark:focus:text-white dark:bg-gray-700 dark:text-gray-300  "
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
          {/* slider banner  */}
          <Slider {...banner}>
            <div className="relative">
              
              <img
                src={Demonslayer}
                className="w-full h-[400px] border-none opacity-30"
                alt="Image"
              />
              <div className="absolute top-1/2 left-4  ">
              <h2 className="text-white text-4xl font-Poppins font-bold">
                  Demon Slayer the Movie: <br />
                  Mugen Train
                </h2>
                <button className="mt-4  border-none bg-[#00008b] text-white font-Poppins px-4 py-2 rounded-sm font-semibold">
                  WATCH NOW
                </button>
              </div>
            </div>
            <div className="relative">
              <img src={Bleach} className=" w-full h-[400px] opacity-30" alt="Image" />
              <div className="absolute top-1/2 left-4  ">
                <h2 className=" text-white text-4xl font-bold z-10 font-Poppins">
                  Bleach
                </h2>
                <button className="mt-4  border-none bg-[#00008b] text-white font-Poppins px-4 py-2 rounded-sm font-semibold">
                  WATCH NOW
                </button>
              </div>
            </div>
            <div className="relative">
              <img src={wotakoi} className=" w-full h-[400px]  opacity-30" alt="Image" />
              <div className="absolute top-1/2 left-4  ">
                <h2 className=" text-white text-4xl font-bold z-10 font-Poppins">
                  wotakoi : love is hard <br /> for otaku
                </h2>
                <button className="mt-4  border-none bg-[#00008b] text-white font-Poppins px-4 py-2 rounded-sm font-semibold">
                  WATCH NOW
                </button>
              </div>
            </div>
          </Slider>
        </div>
        <h1 className="font-Poppins font-bold text-[900] text-white text-[2.55rem]">
          Top Airing
        </h1>
        <Slider {...topairing}>
          {notFound ? (
            <p>No anime found.</p>
          ) : (
            apiData.results &&
            apiData.results.map((item) => (
              <div className="text-white w-full p-2 " key={item.id}>
                {/* Display the relevant data from the API */}
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