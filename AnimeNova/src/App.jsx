import React, { useEffect, useState } from 'react';
import axios from 'axios';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [apiData, setApiData] = useState([]);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchQuery === '') {
          const response = await axios.get('https://api.consumet.org/anime/gogoanime/top-airing', {
            params: { page: 1 },
          });
          setApiData(response.data);
          setNotFound(false);
          
        } else {
          const response = await axios.get(`https://api.consumet.org/anime/gogoanime/${searchQuery}?page=1`);
          if (response.data.results && response.data.results.length > 0) {
            setApiData(response.data);
            setNotFound(false);
          } else {
           
            setNotFound(true);
            setApiData([]);
          }
        }
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
  

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div className='max-w-[1240px] m-auto'>
      <header className='flex justify-between items-center'>
        <div className='flex justify-center items-center gap-4'>
        <img src={reactLogo} className='App-logo' alt='logo' />
       <nav>
        <ul className='flex gap-4'>
          <li>
            <a>Top Airing</a>
          </li>
          <li>
            <a>Recend Episodes</a>
          </li>
          <li>
            <a>Recend Episodes</a>
          </li>
          <li>
            <a>Genre</a>
          </li>
        </ul>
        
       </nav>
       </div>
        <div>
       
        </div>
           
<input type="text" placeholder="Search" value={searchQuery} onChange={handleSearch} />
      </header>
      <div>
     

<div className=' grid grid-cols-4'>

{notFound ? (
        <p>No anime found.</p>
      ) : (
        apiData.results &&
        apiData.results.map((item) => (
          <div className="border-2" key={item.id}>
            {/* Display the relevant data from the API */}
            <p>{item.title}</p>
            <p>{item.description}</p>
            <img src={item.image} alt={item.title} />
            <p>{item.genres}</p>
            <p>Status: {item.status}</p>
            <p>Total Episodes: {item.totalEpisodes}</p>
          </div>
        ))
      )}

    </div>
  
    </div>
    </div>
  );
}

export default App;
