import React, { useState } from 'react';
import { navigate } from "@reach/router";
import axios from 'axios';

export default props => {
  const { playerInfo, setPlayerInfo } = props;
  const [tempName, setTempName] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    axios.get(`http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='${tempName}%25'`)
     .then(res => {
       console.log(res.data.search_player_all.queryResults.row);
       setPlayerInfo(res.data.search_player_all.queryResults.row);
       navigate("/addPlayer/2");
     })
     .catch(err => console.log(err))
  }

  return (
    <div>
      <form onSubmit={ submitHandler }>
        <label for="player-name">Enter the Player Jersey Name:</label>
        <input type="text" name="player-name" placeholder="example: (Trout, Stanton, Perez)" onChange={(event) => { setTempName(event.target.value) }} required/>

        <button className="btn btn-primary" type="submit">Search</button>
      </form>
    </div>
  )

}
