import React from 'react';
import './App.css';
import Topairing from './Pages/Topairing';
import RecentEpisodes from './Pages/RecentEpisodes';
import Streaming from './Pages/Streaming';


function App() {
  return (

    <div className='w-full bg-[#192026] m-auto'>
      <Topairing />
      <RecentEpisodes />
      <Streaming episodeId="spy-x-family-episode-1"/>
       
    </div>
  );
}

export default App;
