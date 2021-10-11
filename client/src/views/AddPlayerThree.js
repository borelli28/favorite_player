import React, { useState, useEffect } from 'react';
import { navigate } from "@reach/router";
import axios from 'axios';

export default props => {
  const { playerInfo } = props;
  const { playerStats } = props;

  const [user, setUser] = useState({});

  useEffect(() => {

    let userObj;
    let playerObj = {};
    let userPlayers;
    axios.get('http://localhost:8000/api/user/', { withCredentials: true })
    .then(user => {

      userObj = user;

      // get user players and append new player into it
      userPlayers = user.data.players;
      // convert local storage item into json object
      let theInfo = JSON.parse(localStorage.getItem("playerInfoLocal"));
      let theStats = JSON.parse(localStorage.getItem("playerStatsLocal"));

      playerObj["playerInfo"] = theInfo ;
      playerObj["playerStats"] = theStats;

      userPlayers.push(playerObj)

      let userId = userObj.data._id;

      // put the new players into the user
      axios.put(`http://localhost:8000/api/user/${userId}/update`, {
        players: userPlayers
      }, { withCredentials: true })
      .then(response => {
        console.log("Player added to user. Now returning the server response")
        console.log(response)
      })
      .catch(error => {
        console.log(`Could not add new player to user instance: ${error}`);
      })

      navigate("/favorite_players");
    });
  });


  return (
    ""
  )

}
