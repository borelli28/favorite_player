import '../stylesheets/homeStyle.css';
import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import axios from 'axios';

export default props => {
  const [users, setUsers] = useState([]);
  const [player, setPlayer] = useState([]);
  const [getBool, setGetBool] = useState(false);

  useEffect(()=>{
    axios.get('http://localhost:8000/api/user')
      .then(res=>{
        console.log(res.data)
        setUsers(res.data);

      });
  },[])

  return (
    <div>
      <Nav />
      <h1 id="player-name">{ users.map((player,idx)=> player.favInfo.name) }</h1>
      <div id="table-container">
        <table className="table table-hover" id="table">
          <thead>
            <tr>
              <th>Team</th>
              <th>Age</th>
              <th>Position</th>
              <th>AB</th>
              <th>H</th>
              <th>RBI</th>
              <th>R</th>
              <th>SB</th>
            </tr>
          </thead>
          <tbody>
            {
              (users
                ? users.map((player, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{ player.favStats.team_full }</td>
                      <td>Not available</td>
                      <td>{ player.favInfo.position }</td>
                      <td>{ player.favStats.ab }</td>
                      <td>{ player.favStats.h }</td>
                      <td>{ player.favStats.rbi }</td>
                      <td>{ player.favStats.r }</td>
                      <td>{ player.favStats.sb }</td>
                  </tr>
                  )
                })
              : "NO DATA"
              )
            }
          </tbody>
        </table>
      </div>
      {
        users.map((user, idx) => {
          return <h3 key={idx}>User Email: { user.email }, User id: { user._id }</h3>
        })
      }
    </div>
  )

}
