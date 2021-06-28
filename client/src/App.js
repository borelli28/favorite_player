import './App.css';
import React, { useState, useEffect } from 'react';
import { Router } from '@reach/router';
import axios from 'axios';
import { navigate } from "@reach/router";
import Home from './views/Home';
import Players from './views/Players';
import AddPlayerOne from './views/AddPlayerOne';
import AddPlayerTwo from './views/AddPlayerTwo';
import AddPlayerThree from './views/AddPlayerThree';
import PlayerNA from './views/PlayerNA';
import LogReg from './views/LogReg';

function App() {
  const [playerStats, setPlayerStats] = useState([]);
  const [playerInfo, setPlayerInfo] = useState([]);
  const [id, setId] = useState("");

  const [userAuth, setUserAuth] = useState(true);


  // check if there is an user logged in by requesting user object
  useEffect(() => {
    setUserAuth(true)

    axios.get('http://localhost:8000/api/user/', { withCredentials: true })
    .then(user => {
      console.log("User is logged");
      setUserAuth(true);
      navigate('/home')
    })
    .catch(error => {
      console.log("User is not logged");
      setUserAuth(false);
      navigate('/')
    })

  }, [])
  console.log(userAuth);

  if (userAuth) {
    return (
      <div className="App">
        <Router>
          <LogReg path="/" />
          <Home path="/home" id={id} setId={setId} playerStats={playerStats} setPlayerStats={setPlayerStats} playerInfo={playerInfo} setPlayerInfo={setPlayerInfo}/>
          <Players path="/favorite_players" />
          <AddPlayerOne path="/addPlayer/1" playerInfo={playerInfo} setPlayerInfo={setPlayerInfo}/>
          <AddPlayerTwo path="/addPlayer/2" id={id} setId={setId} playerStats={playerStats} setPlayerStats={setPlayerStats} playerInfo={playerInfo} setPlayerInfo={setPlayerInfo}/>
          <AddPlayerThree path="/addPlayer/3" playerStats={playerStats} playerInfo={playerInfo}/>
          <PlayerNA path="/playerNotAvailable" />
        </Router>
      </div>
    )
  } else {
    return (
      <div className="App">
        <Router>
          <LogReg path="/" />
        </Router>
      </div>
    )
  }
}

export default App;
