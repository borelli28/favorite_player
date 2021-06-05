import '../stylesheets/addOneStyle.css';
import React, { useState } from 'react';
import { navigate } from "@reach/router";
import axios from 'axios';
import Nav from '../components/Nav';

export default props => {
  const { playerInfo, setPlayerInfo } = props;
  const [tempName, setTempName] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    axios.get(`http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='${tempName}%25'`)
      .then(res => {
        console.log("all players data return by api:");
        console.log(res.data.search_player_all.queryResults.row);
        setPlayerInfo(res.data.search_player_all.queryResults.row);
        navigate("/addPlayer/2");
     })
      .catch(err => console.log(err))
  }

  return (
    <main>
      <Nav />
      <div id="container">
        <form onSubmit={ submitHandler }>
          <label for="player-name">Enter the Player Jersey Name:</label>
          <input type="text" name="player-name" placeholder="example: (Trout, Stanton)" onChange={(event) => { setTempName(event.target.value) }} required/>

          <button className="btn btn-light" type="submit" id="search-btn">Search</button>
        </form>
      </div>
    </main>
  )

}
