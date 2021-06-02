import '../stylesheets/addTwoStyle.css';
import React, { useState } from 'react';
import { navigate } from "@reach/router";
import axios from 'axios';
import Nav from '../components/Nav';

export default props => {
  const { playerInfo, setPlayerInfo } = props;
  const { playerStats, setPlayerStats } = props;
  const {id, setId} = props;
  // Selected player, Full name, Position & ID
  const [name, setName] = useState("");
  const [pos, setPos] = useState("");

  // console.log(playerInfo);

  const submitHandler = (event) => {
    event.preventDefault();
    axios.get(`http://lookup-service-prod.mlb.com/json/named.search_player_all.bam/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='2021'&player_id='${id}'`)
      .then(res => {
        // console.log("Response:");
        // console.log(res.data.sport_hitting_tm.queryResults.row);
        setPlayerStats(res.data.sport_hitting_tm.queryResults.row);
        setPlayerInfo({name:name, position:pos, id:id})
        navigate("/addPlayer/3");
      })
      .catch(err => console.log(err))
  }

  return (
    <main>
      <Nav />
      <div id="table-container">
        <table className="table table-hover" id="table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Position</th>
              <th>Team</th>
              <th>Player ID</th>
              <th>Roster Name (Jersey Name)</th>
              <th>Actions</th>
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
                  <td>
                    <form onSubmit={ submitHandler } >
                      <button className="btn btn-light" id="add-player-btn" onClick={(event) => { setName(player.name_display_first_last);
                      setPos(player.position);
                    setId(player.player_id); }}>Add Player</button>
                    </form>
                  </td>
                </tr>
              )
            })
            : <tr>
                <td>{playerInfo.name_display_first_last}</td>
                <td>{playerInfo.position}</td>
                <td>{playerInfo.team_full}</td>
                <td>{playerInfo.player_id}</td>
                <td>{playerInfo.name_display_roster}</td>
                <td>
                  <form onSubmit={ submitHandler } >
                    <button className="btn btn-light" id="add-player-btn" onClick={(event) => { setName(playerInfo.name_display_first_last);
                    setPos(playerInfo.position);
                  setId(playerInfo.player_id); }}>Add Player</button>
                  </form>
                </td>
              </tr>
            )
          }
          </tbody>
        </table>
      </div>

    </main>
  )

}
