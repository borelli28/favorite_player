import './App.css';
import React, { useState } from 'react';
import { Router } from '@reach/router';
import Login from './views/Login';
import Register from './views/Register';
import Home from './views/Home';
import Players from './views/Players';
import AddPlayerOne from './views/AddPlayerOne';
import AddPlayerTwo from './views/AddPlayerTwo';
import AddPlayerThree from './views/AddPlayerThree';

function App() {
  const [playerStats, setPlayerStats] = useState({});
  const [playerInfo, setPlayerInfo] = useState({});
  const [id, setId] = useState("");

  return (
    <div className="App">
      <Router>
        <Login path="/" />
        <Register path="/register" />
        <Home path="/home" id={id} setId={setId} playerStats={playerStats} setPlayerStats={setPlayerStats} playerInfo={playerInfo} setPlayerInfo={setPlayerInfo}/>
        <Players path="/favorite_players" />
        <AddPlayerOne path="/addPlayer/1" playerInfo={playerInfo} setPlayerInfo={setPlayerInfo}/>
        <AddPlayerTwo path="/addPlayer/2" id={id} setId={setId} playerStats={playerStats} setPlayerStats={setPlayerStats} playerInfo={playerInfo} setPlayerInfo={setPlayerInfo}/>
        <AddPlayerThree path="/addPlayer/3" playerStats={playerStats} playerInfo={playerInfo}/>
      </Router>
    </div>
  );
}

export default App;
