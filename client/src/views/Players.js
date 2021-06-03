import '../stylesheets/playersStyle.css';
import React, {  useState } from 'react';
import { navigate } from "@reach/router";
import axios from 'axios';
import Nav from '../components/Nav';

export default () => {
  const [players, setPlayers] = useState([]);
  const [getBool, setGetBool] = useState(false);

  if (getBool === false) {
    setGetBool(true);
    axios.get('http://localhost:8000/api/players')
      .then(res => {
        setPlayers(res.data);
      })
      .catch(err => console.log(err));
  }

  const addPlayer = () => {
    navigate("/addPlayer/1");
  }

  return (
    <div>
      <Nav />
      <div id="table-container">
        <table className="table table-strip table-hover" id="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Team</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              (players
              ? players.map((player, idx) => {
                return (
                  <tr key={idx}>
                    <td>{player.favInfo.name}</td>
                    <td>{player.favStats.team_full}</td>
                    <td>{player.favInfo.position}</td>
                    <td>
                      <button className="btn btn-danger">Remove</button>
                    </td>
                  </tr>
                )
              })
              : "No data"
              )
            }
          </tbody>
        </table>
      </div>
      <button className="btn btn-light" type="button" id="add-player-btn" onClick={ addPlayer }>Add Player</button>
    </div>
  )

}
