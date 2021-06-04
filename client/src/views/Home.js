import '../stylesheets/homeStyle.css';
import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import axios from 'axios';

export default props => {
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState([]);
  const [getBool, setGetBool] = useState(false);

  const {id, setId} = props;
  const { playerInfo, setPlayerInfo } = props;
  const { playerStats, setPlayerStats } = props;

  useEffect(()=>{
    axios.get('http://localhost:8000/api/players')
      .then(res=>{
        console.log("res:");
        console.log(res.data)
        setPlayers(res.data);
        // // get player id from favInfo
        // setId(res.data[0].favInfo.id)
      });
  },[])

  // request player stats using player id in favInfo
  const refreshHandler = (event) => {
    event.preventDefault();
    // ask for the new data and assign the response to playerStats
    axios.get(`http://lookup-service-prod.mlb.com/json/named.search_player_all.bam/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='2021'&player_id='${id}'`)
      .then(res => {
        setPlayerStats(res.data.sport_hitting_tm.queryResults.row);
        console.log("New stats requested");

      })
      .catch(err => console.log(err))
    // update favStats using the playerStats data
    axios.put('http://localhost:8000/api/user/60641892ec24325f9f30eccc/update', {
      favStats: playerStats
    })
      .then(res => console.log(res));
  }

  //  deletes all data in the database
  const wipeDBClean = () => {
    axios.delete("http://localhost:8000/api/delete/data")
      .then(res => {
        console.log("and is gone.")
      })
      .catch(err => console.log("the data could not be deleted: " + err))
  }

  return (
    <div>
      <Nav />
      <h1>My Players</h1>
      <div id="table-container">
        <table className="table table-hover" id="table">
          <thead>
            <tr>
              <th>Team</th>
              <th>Name</th>
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
              (players
                ? players.map((player, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{ player.favStats.team_full }</td>
                      <td>{ player.favInfo.name }</td>
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
    </div>
  )

}
