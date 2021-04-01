import '../stylesheets/playersStyle.css';
import React, {  useState } from 'react';
import { navigate } from "@reach/router";
import axios from 'axios';
import Nav from '../components/Nav';

export default () => {
  const [player, setPlayer] = useState([]);
  const [getBool, setGetBool] = useState(false);

  if (getBool === false) {
    // console.log("setting getBool to:")
    setGetBool(true);
    // console.log(!getBool);
    axios.get('http://localhost:8000/api/user')
      .then(res => {
        setPlayer(res.data);
      })
      .catch(err => console.log(err));
  }

  console.log("my player:")
  console.log(player)

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
              (player
              ? player.map((pl, idx) => {
                return (
                  <tr key={idx}>
                    <td>{pl.favInfo.name}</td>
                    <td>{pl.favStats.team_full}</td>
                    <td>{pl.favInfo.position}</td>
                    <td>
                      <button className="btn btn-danger">Remove</button> <button className="btn btn-warning">Favorite</button>
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
