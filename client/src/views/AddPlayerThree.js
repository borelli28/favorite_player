import React, { useState, useEffect } from 'react';
import { navigate } from "@reach/router";
import axios from 'axios';

export default props => {
  const { playerInfo } = props;
  const { playerStats } = props;

  const [user, setUser] = useState({});

  // console.log("Player Info");
  // console.log(playerInfo);
  // console.log("Player Stats");
  // console.log(playerStats);

  useEffect(() => {
    axios.get('http://localhost:8000/api/user')
      .then(res => {
        // console.log(res)
        setUser(res)
      })
  })

  useEffect(() => {
    axios.put('http://localhost:8000/api/user/60641892ec24325f9f30eccc/update', {
      email: user.email,
      password: user.password,
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
