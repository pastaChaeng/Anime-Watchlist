import React from 'react';
import './App.css';
import Topairing from './Pages/Topairing';
import RecentEpisodes from './Pages/RecentEpisodes';


function App() {
  return (

    <div className='w-full bg-[#192026] m-auto'>
      <Topairing />
      
      <RecentEpisodes />
    </div>
  );
}

export default App;
