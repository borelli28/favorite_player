import '../stylesheets/playersStyle.css';
import React, {  useState, useEffect } from 'react';
import { navigate } from "@reach/router";
import axios from 'axios';
import Nav from '../components/Nav';

export default () => {
  const [user, setUser] = useState();
  const [players, setPlayers] = useState([]);

  // used by deletePlayer method
  const [idToDelete, setIdToDelete] = useState("");

  useEffect(() => {

    // get the user object from the server
    axios.get('http://localhost:8000/api/user/', { withCredentials: true })
    .then(user => {
      setUser(user.data);
      setPlayers(user.data.players);
    })
    .catch(error => {
      console.log(error.response.status);
      if (error.response.status == 401) {
        navigate('/')
        window.location.reload();
      }
    })
  },[])

  // redirect to add player page
  const addPlayer = () => {
    navigate("/addPlayer/1");
  }

  // deletes a player
  const deletePlayer = () => {

    // iterate trough user looking checking for the element that match the player id,
    // when player is found then that object is pop out of players with a PUT request
    for (let player in user.players) {
      // if we found an id match for the player we want to delete, remove that player object from players,
      // and called the PUT server api to update user
      if (user.players[player].playerInfo.id == idToDelete) {

        let deletedPlayer = user.players.splice(player, 1);

        axios.put(`http://localhost:8000/api/user/${user._id}/update`, { players: user.players }, { withCredentials: true })
        .then(response => {
          console.log(`Player deleted: ${response}`);
        })
        .catch(error => {
          console.log(`Error occured while trying to delete player from user players: ${error}`);
        })
      }
    }

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
                    <td>{ player.playerInfo.name }</td>
                    <td>{ player.playerStats.team.name }</td>
                    <td>{ player.playerInfo.position }</td>
                    <td>
                      <form onSubmit={ deletePlayer }>
                        <button type="submit" className="btn btn-danger" onClick={() => setIdToDelete(player.playerInfo.id)}>Remove</button>
                      </form>
                    </td>
                  </tr>
                )
              })
              : ""
              )
            }
          </tbody>
        </table>
      </div>
      <button className="btn btn-light" type="button" id="add-player-btn" onClick={ addPlayer }>Add Player</button>
    </div>
  )

}
