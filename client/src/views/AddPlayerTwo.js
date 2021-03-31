import React, { useState } from 'react';
import { navigate } from "@reach/router";
import axios from 'axios';

export default props => {
  const { playerInfo, setPlayerInfo } = props;
  const { playerStats, setPlayerStats } = props;

  console.log(playerInfo);

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
              <th>Jersey Name</th>
            </tr>
          </thead>
          <tbody>
          {
            (playerInfo.length > 1
            ? playerInfo.map((player, idx) => {
              return (
                <tr key={idx}>
                  <td>{player.name_display_first_last}</td>
                  <td>{player.position}</td>
                  <td>{player.team_full}</td>
                  <td>{player.player_id}</td>
                  <td>{player.name_display_first_last}</td>
                </tr>
              )
            })
            : <tr>
                <td>{player.name_display_first_last}</td>
                <td>{player.position}</td>
                <td>{player.team_full}</td>
                <td>{player.player_id}</td>
                <td>{player.name_display_first_last}</td>
              </tr>
            )
          }
          </tbody>
        </table>
      </div>
      <h2>Copy/Paste the Information from the table above</h2>
      <form>
        <label for="full-name">Full Name:</label>
        <input type="text" name="full-name"/>

        <label for="pos">Position:</label>
        <input type="text" name="pos"/>

        <label for="id">Player ID:</label>
        <input type="text" name="id"/>

        <button className="btn btn-primary">Add Player</button>

      </form>
    </div>
  )

}
