import '../stylesheets/navStyle.css';
import React from 'react';
import { navigate } from "@reach/router";

export default () => {

  const redirectHome = () => {
    // console.log("redirecting to home");
    navigate("/home");
  }

  const redirectPlayers = () => {
    // console.log("redirect to favorite players");
    navigate("/favorite_players");
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
      </ul>
    </nav>
  )

}
