import '../stylesheets/navStyle.css';
import React from 'react';
import { navigate } from "@reach/router";
import axios from 'axios';

export default () => {

  const redirectHome = () => {
    console.log("redirecting to home");
    navigate("/home");
  }

  const redirectPlayers = () => {
    console.log("redirect to favorite players");
    navigate("/favorite_players");
  }

  const logout = () => {
    axios.post('http://localhost:8000/api/logout')
      .then(res => {
        console.log("user logout");
        console.log(res);
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
        <li>
          <button className="btn btn-light" onClick={ logout }>Logout</button>
        </li>
      </ul>
    </nav>
  )

}
