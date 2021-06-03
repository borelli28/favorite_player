import React, { useState, useEffect } from 'react';
import { navigate } from "@reach/router";
import axios from 'axios';

export default props => {
  const { playerInfo } = props;
  const { playerStats } = props;

  const [user, setUser] = useState({});

  useEffect(() => {
    axios.post('http://localhost:8000/api/new/player', {
      id: 1,
      favStats: playerStats,
      favInfo: playerInfo
    })
      .then(res => console.log(res));
      navigate("/favorite_players");
  })

  return (
    ""
  )

}
