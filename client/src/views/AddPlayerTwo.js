import React, { useState } from 'react';
import { navigate } from "@reach/router";
import axios from 'axios';

export default props => {
  const { playerInfo, setPlayerInfo } = props;
  const { playerStats, setPlayerStats } = props;
  // Selected player, Full name, Position & ID
  const [name, setName] = useState("");
  const [pos, setPos] = useState("");
  const [id, setId] = useState("");

  // console.log(playerInfo);

  const submitHandler = (event) => {
    event.preventDefault();
    axios.get(`http://lookup-service-prod.mlb.com/json/named.search_player_all.bam/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='2020'&player_id='${id}'`)
      .then(res => {
        console.log("Response:");
        console.log(res.data.sport_hitting_tm.queryResults.row);
        setPlayerStats(res.data.sport_hitting_tm.queryResults.row);
      })
      .catch(err => console.log(err))
    navigate("/addPlayer/3");
  }

  return (
    <div>
      <div id="table-container">
        <table className="table table-hover" id="table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Position</th>
              <th>Team</th>
              <th>Player ID</th>
              <th>Roster Name (Jersey Name)</th>
            </tr>
          </thead>
          <tbody>
          {
            (playerInfo.length > 0
            ? playerInfo.map((player, idx) => {
              return (
                <tr key={idx}>
                  <td>{player.name_display_first_last}</td>
                  <td>{player.position}</td>
                  <td>{player.team_full}</td>
                  <td>{player.player_id}</td>
                  <td>{player.name_display_roster}</td>
                </tr>
              )
            })
            : <tr>
                <td>{playerInfo.name_display_first_last}</td>
                <td>{playerInfo.position}</td>
                <td>{playerInfo.team_full}</td>
                <td>{playerInfo.player_id}</td>
                <td>{playerInfo.name_display_roster}</td>
              </tr>
            )
          }
          </tbody>
        </table>
      </div>
      <h2>Copy/Paste the Information from the table above</h2>
      <form onSubmit={ submitHandler }>
        <label for="full-name">Full Name:</label>
        <input type="text" name="full-name" onChange={(event) => { setName(event.target.value) }} required/>

        <label for="pos">Position:</label>
        <input type="text" name="pos" onChange={(event) => { setPos(event.target.value) }} required/>

        <label for="id">Player ID:</label>
        <input type="text" name="id" onChange={(event) => { setId(event.target.value) }} required/>

        <button className="btn btn-primary">Add Player</button>
      </form>
    </div>
  )

}
