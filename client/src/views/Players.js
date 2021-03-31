import '../stylesheets/playersStyle.css';
import React, {  useState, useEffect } from 'react';
import { navigate } from "@reach/router";
import axios from 'axios';
import Nav from '../components/Nav';

export default () => {

  const [players, setPlayers] = useState([]);

  const getSome = () => {
    axios.get('http://localhost:8000/api/user')
      .then(res => {
        setPlayers(res);
        console.log("my players:")
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  const addPlayer = () => {
    navigate("/addPlayer");
  }

  return (
    <div>
      <Nav />
      <button className="btn btn-info" onClick={ getSome }>GET</button>
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
            <tr>
              <td>Mike Trout</td>
              <td>LAA</td>
              <td>CF</td>
              <td>
                <button className="btn btn-danger">Remove</button> <button className="btn btn-warning">Favorite</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary" type="button" id="add-player-btn" onClick={ addPlayer }>Add Player</button>
    </div>
  )

}
