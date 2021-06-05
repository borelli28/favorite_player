import './App.css';
import React, { useState } from 'react';
import { Router } from '@reach/router';
import Home from './views/Home';
import Players from './views/Players';
import AddPlayerOne from './views/AddPlayerOne';
import AddPlayerTwo from './views/AddPlayerTwo';
import AddPlayerThree from './views/AddPlayerThree';
import PlayerNA from './views/PlayerNA';

function App() {
  const [playerStats, setPlayerStats] = useState({});
  const [playerInfo, setPlayerInfo] = useState({});
  const [id, setId] = useState("");

  return (
    <div className="App">
      <Router>
        <Home path="/home" id={id} setId={setId} playerStats={playerStats} setPlayerStats={setPlayerStats} playerInfo={playerInfo} setPlayerInfo={setPlayerInfo}/>
        <Players path="/favorite_players" />
        <AddPlayerOne path="/addPlayer/1" playerInfo={playerInfo} setPlayerInfo={setPlayerInfo}/>
        <AddPlayerTwo path="/addPlayer/2" id={id} setId={setId} playerStats={playerStats} setPlayerStats={setPlayerStats} playerInfo={playerInfo} setPlayerInfo={setPlayerInfo}/>
        <AddPlayerThree path="/addPlayer/3" playerStats={playerStats} playerInfo={playerInfo}/>
        <PlayerNA path="/playerNotAvailable" />
      </Router>
    </div>
  );
}

export default App;
