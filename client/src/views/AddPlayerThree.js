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
      console.log("User Obj");

      userObj = user;
      console.log(userObj);

      // get user players and append new player into it
      userPlayers = user.data.players;
      console.log("user players:")
      console.log(userPlayers);

      // convert local storage item into json object
      let theInfo = JSON.parse(localStorage.getItem("playerInfoLocal"));
      let theStats = JSON.parse(localStorage.getItem("playerStatsLocal"));

      playerObj["playerInfo"] = theInfo ;
      playerObj["playerStats"] = theStats;

      console.log("playerObj:")
      console.log(playerObj);

      userPlayers.push(playerObj)
      console.log("user id:")
      let userId = userObj.data._id;

      // put the new players into the user
      axios.put(`http://localhost:8000/api/user/${userId}/update`, {
        players: userPlayers
      }, { withCredentials: true })
      .then(response => {
        console.log("updated user:")

        console.log(response);
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
