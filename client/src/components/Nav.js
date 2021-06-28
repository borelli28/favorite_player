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
    navigate("/favorite_players");
  }

  const logout = () => {
    console.log("in logout method");
    axios.post('http://localhost:8000/api/logout', {  withCredentials: true})
    .then(response => {
      console.log("user logout");
      console.log(response);
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
        <li>
          <button className="btn btn-light" onClick={ logout }>Logout</button>
        </li>
      </ul>
    </nav>
  )

}
