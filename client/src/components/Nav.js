import '../stylesheets/navStyle.css';
import React from 'react';
import { navigate } from "@reach/router";
import axios from 'axios';

export default () => {

  const redirectHome = () => {
    // console.log("redirecting to home");
    navigate("/home");
  }

  const redirectPlayers = () => {
    // console.log("redirect to favorite players");
    navigate("/players");
  }

  const logout = () => {
    axios.get('http://localhost:8000/api/logout')
    .then(response => {
      console.log("user logout");
      navigate('/')
    })
    .catch(error => {
      console.log("Logout failed")
      console.log(error.response)
    })
  }

  return (
    <nav className="active">
      <ul id="nav">
        <li>
          <button className="btn btn-light" onClick={ redirectHome }>Home</button>
        </li>
        <li>
          <button className="btn btn-light" onClick={ redirectPlayers }>Players</button>
        </li>
        <li id="win-predictor">
          <button className="btn btn-light" onClick={ redirectHome }>Who will win?</button>
        </li>
        <li>
          <button className="btn btn-light" onClick={ logout }>Logout</button>
        </li>
      </ul>
    </nav>
  )

}
