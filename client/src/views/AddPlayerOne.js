import '../stylesheets/addOneStyle.css';
import React, { useState } from 'react';
import { navigate } from "@reach/router";
import axios from 'axios';
import Nav from '../components/Nav';

export default props => {
  const { playerInfo, setPlayerInfo } = props;

  const [tempName, setTempName] = useState("");
  const [playerNullError,  setPlayerNullError] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    axios.get(`http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='${tempName}%25'`)
      .then(res => {
        console.log("Add Player One API response:")
        console.log(res)
        try {
          if (res.data.search_player_all.queryResults.row != undefined) {
            setPlayerInfo(res.data.search_player_all.queryResults.row);
            navigate("/addPlayer/2");
          } else {
            throw error
          }
        } catch {
          setPlayerNullError("Sorry, but we could not find a player with this name");
        }
     })
      .catch(err => console.log(err))
      navigate("/addPlayer/1");
  }

  return (
    <main>
      <Nav />
      <span id="valError">{playerNullError}</span>
      <div id="container">
        <form onSubmit={ submitHandler }>
          <label htmlFor="player-name">Enter the Player Name:</label>
          <input type="text" name="player-name" placeholder="example: (Trout, Stanton)" onChange={(event) => { setTempName(event.target.value) }} required/>

          <button className="btn btn-light" type="submit" id="search-btn">Search</button>
        </form>
      </div>
    </main>
  )

}
