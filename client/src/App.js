import './App.css';
import React, { useState } from 'react';
import { Router } from '@reach/router';
import Login from './views/Login';
import Register from './views/Register';
import Home from './views/Home';
import Players from './views/Players';
import AddPlayer from './views/AddPlayer'

function App() {
  const [playerPick, setPlayerPick] = useState("");

  return (
    <div className="App">
      <Router>
        <Login path="/" />
        <Register path="/register" />
        <Home path="/home" />
        <Players path="/favorite_players" />
        <AddPlayer path="/addPlayer" playerPick={playerPick} setPlayerPick={setPlayerPick}/>
      </Router>
    </div>
  );
}

export default App;
