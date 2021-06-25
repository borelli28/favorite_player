import '../stylesheets/playersStyle.css';
import React, {  useState } from 'react';
import { navigate } from "@reach/router";
import axios from 'axios';
import Nav from '../components/Nav';

export default () => {
  const [players, setPlayers] = useState([]);
  const [getBool, setGetBool] = useState(false);
  // when user clicks on remove button the id of the player is stored here so we can pass it in the route in the request
  const [idToDelete, setIdToDelete] = useState("");

  if (getBool === false) {
    setGetBool(true);
    axios.get('http://localhost:8000/api/players', { withCredentials: true })
      .then(res => {
        setPlayers(res.data);
      })
      .catch(err => console.log(err));
  }

  // redirect to add player page
  const addPlayer = () => {
    navigate("/addPlayer/1");
  }

  // deletes a player
  const deletePlayer = () => {
    // pass the id of the player so it can be deleted
    axios.delete(`http://localhost:8000/api/player/${idToDelete}/delete`, { withCredentials: true })
      .then(res => {
        console.log("Player deleted");
      })
      .catch(err => console.log(err))
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
                      <form onSubmit={ deletePlayer }>
                        <button type="submit" className="btn btn-danger" onClick={() => setIdToDelete(player._id)}>Remove</button>
                      </form>
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
