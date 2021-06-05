import React, { useState, useEffect } from 'react';
import { navigate } from "@reach/router";
import axios from 'axios';

export default props => {
  const { playerInfo } = props;
  const { playerStats } = props;

  const [user, setUser] = useState({});

  // check that playerStats state is not empty else it will navugate back to add player two with an error
  useEffect(() => {
    axios.post('http://localhost:8000/api/new/player', {
      id: 1,
      favStats: playerStats,
      favInfo: playerInfo
    })
      .then(res => console.log("Player added!"));
      navigate("/favorite_players");
  })


  return (
    ""
  )

}
