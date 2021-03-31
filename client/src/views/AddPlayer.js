import React, { useEffect, useState } from 'react';
import { navigate } from "@reach/router";
import axios from 'axios';

export default props => {
  const [playerName, setPlayerName] = useState("");
  const [active, setActive] = useState("");
  const [result, setResult] = useState([]);
  const [errors, setErrors] = useState([]);
  const [id, setId] = useState("");
  const { playerPick, setPlayerPick } = props;
  const [favPlayers, setFavPlayers] = useState({});
  const [oneFavPlayer, setOneFavPlayer] = useState({});
  const [bru, setBru] = useState("");

  const submitHandler = (event) => {
    event.preventDefault()
    axios.get(`http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='${playerName}%25'`)
      .then(res => {
        setResult(res.data.search_player_all.queryResults.row);
        console.log(res.data.search_player_all.queryResults.row);
      })
      .catch(err => console.log(err))
  }

  const userPickPlayer = (event) => {
    event.preventDefault();
    axios.get(`http://lookup-service-prod.mlb.com/json/named.search_player_all.bam/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='2020'&player_id='${id}'`)
      .then(res => {
        console.log("Response:");
        console.log(res);
        // data that is going to be put in: fav_players.info()
        setBru(res.data.sport_hitting_tm.queryResults.row);
      })
      .catch(err => console.log(err))
      const fullPlayerName = playerName.toUpperCase();
    // navigate("/favorite_players");
  }
  // console.log("Player Picked data:");
  // console.log(playerPick);

  const addMofo = () => {
    axios.put(`http://localhost:8000/api/user/60637cbb5537a682365f228b/update`, {
      // favPlayers: {playerPick, fullPlayerName}
      favPlayers: bru
    })
      .then(res => console.log(res));
  }

  return (
    <div>
      <form onSubmit={ submitHandler }>
        <label for="player-name">Enter the Player Jersey Name:</label>
        <input type="text" name="player-name" placeholder="example: (trout, stanton)" onChange={(event) => { setPlayerName(event.target.value) }} required/>

        <label for="active">Active? Y or N</label>
        <input name="active" onChange={(event) => { setActive(event.target.value) }}/>

        <button className="btn btn-primary" type="submit">Request</button>
      </form>
      <button onClick={ addMofo }>Add Player to list</button>

      <div id="table-container">
        <table className="table table-hover" id="table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>ID</th>
              <th>Team</th>
              <th>Position</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
          {
            (result.length > 1
            ? result.map((player, idx) => {
              return (
                <tr>
                  <td>{player.name_display_first_last}</td>
                  <td>{player.player_id}</td>
                  <td>{player.team_full}</td>
                  <td>{player.position}</td>
                  <td><input type="text" placeholder="Copy/Paste the ID here" onChange={(event) => { setId(event.target.value) }} required/><button className="btn btn-primary" onClick={ userPickPlayer }>Add Player</button></td>
                </tr>
              )
            })
            : <tr>
                <td>{result.name_display_first_last}</td>
                <td>{result.player_id}</td>
                <td>{result.team_full}</td>
                <td>{result.position}</td>
                <td><input type="text" placeholder="Copy/Paste the ID here" onChange={(event) => { setId(event.target.value) }} required/><button className="btn btn-primary" onClick={ userPickPlayer }>Add Player</button></td>
              </tr>
            )
          }
          </tbody>
        </table>
      </div>
    </div>
  )

}
// <p>Is the player currently activate:</p>
// <label for="yes">Yes</label>
// <input type="radio" id="yes" name="active?" value="Y"/>
//
// <label for="no">No</label>
// <input type="radio"id="no" name="active?" value="N"/>
