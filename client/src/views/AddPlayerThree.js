import React, { useState, useEffect } from 'react';
import { navigate } from "@reach/router";
import axios from 'axios';

export default props => {
  const { playerInfo } = props;
  const { playerStats } = props;
  const { userLogged, setUserLogged } = props;

  const [user, setUser] = useState({});

  // check that playerStats state is not empty else it will navugate back to add player two with an error
  useEffect(() => {
    const loggedUserId = userLogged["_id"];
    axios.post('http://localhost:8000/api/new/player', {
      user_id: loggedUserId,
      favInfo: playerInfo
    },
      { withCredentials: true }
    )
    .then(response => {
      console.log("Player added!");

      // get the player object id so we can append it to user.players
      const playerId = response.data.player.favInfo.id;
      console.log("playerId");
      console.log(playerId);

      userLogged["playerIds"].push(playerId);

      const newPlayerIds = userLogged["playerIds"];

      console.log("new players ids");
      console.log(newPlayerIds);

      // insert the player id into the user players
      axios.put(`http://localhost:8000/api/user/${loggedUserId}/update`, {
        playerIds: newPlayerIds
      }, { withCredentials: true })
      .then(response => {
        console.log("updated user:")

        console.log(response);
      })

      navigate("/favorite_players");
    });
  });


  return (
    ""
  )

}
