import '../stylesheets/homeStyle.css';
import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import axios from 'axios';
import { navigate } from "@reach/router";


export default props => {
  // clears out all local storage on home render
  localStorage.clear();

  const [players, setPlayers] = useState([]);

  const [ userLogged, setUserLogged ] = useState();

  // use to track screen size for mobile responsiveness
  const [width, setWidth] = useState(window.innerWidth);

  // when screen resizes it will set the width to the current screen width
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {

    // clears out the players in the hook to fix duplicates players bug
    setPlayers([]);

    // get the user object from the server
    axios.get('http://localhost:8000/api/user/', { withCredentials: true })
    .then(user => {
      console.log("User:");
      console.log(user.data);
      setUserLogged(user.data)
      // setPlayers(user.data.players);

      for (let i in user.data.players) {
        // console.log(user.data.players[i])
        let playerId = user.data.players[i].playerInfo.id;

        // now get fresh stats data from the API, and PUT them in the user players object
        axios.get(`http://lookup-service-prod.mlb.com/json/named.search_player_all.bam/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='2021'&player_id='${playerId}'`)
        .then(res => {
          user.data.players[i].playerStats = res.data.sport_hitting_tm.queryResults.row;
          setPlayers(user.data.players);
          console.log("New stats requested");
        })
        .catch(err => console.log(err))
      }

    });
  },[])

  console.log("The Players:")
  console.log(players);

  // deletes all data in the database
  const wipeDBClean = () => {

    axios.delete('http://localhost:8000/api/delete/all/users', { withCredentials: true })
      .then(res => {
        console.log("And its...gone!")
        navigate('/')
      })
      .catch(err => console.log("the data could not be deleted: " + err))

  }

  if (width > 750) {
    return (
      <div id="desktop">
        <Nav />
        <h1>My Players</h1>
        <button className="btn btn-danger" onClick={ wipeDBClean }> wipe all data from db</button>
        <div id="table-container">
          <table className="table table-hover" id="table">
            <thead>
              <tr>
                <th>Team</th>
                <th>Name</th>
                <th>Position</th>
                <th>AB</th>
                <th>H</th>
                <th>TB</th>
                <th>OBP</th>
                <th>RBI</th>
                <th>SO</th>
                <th>R</th>
                <th>HR</th>
                <th>SB</th>
                <th>CS</th>
              </tr>
            </thead>
            <tbody>
              {
                (players
                  ? players.map((player, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{ player.playerStats.team_full }</td>
                        <td>{ player.playerInfo.name }</td>
                        <td>{ player.playerInfo.position }</td>
                        <td>{ player.playerStats.ab }</td>
                        <td>{ player.playerStats.h }</td>
                        <td>{ player.playerStats.tb }</td>
                        <td>{ player.playerStats.obp }</td>
                        <td>{ player.playerStats.rbi }</td>
                        <td>{ player.playerStats.so }</td>
                        <td>{ player.playerStats.r }</td>
                        <td>{ player.playerStats.hr }</td>
                        <td>{ player.playerStats.sb }</td>
                        <td>{ player.playerStats.cs }</td>
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
  } else {

    return (
      <div id="small-mobile">
        <Nav />
        <h1>My Players</h1>
<div>
  {
    (players
      ? players.map((player, idx) => {
        return (
          <div key={idx}>
            <h4>{ player.playerInfo.name }</h4>
            <ul className="list-group">
              <li className="list-group-item">Team: <span>{ player.playerStats.team_full }</span></li>
              <li className="list-group-item">Position: <span>{ player.playerInfo.position }</span></li>
              <li className="list-group-item">At Bats: <span>{ player.playerStats.ab }</span></li>
              <li className="list-group-item">Hits: <span>{ player.playerStats.h }</span></li>
              <li className="list-group-item">Total Bases: <span>{ player.playerStats.tb }</span></li>
              <li className="list-group-item">On Base %: <span>{ player.playerStats.obp }</span></li>
              <li className="list-group-item">Runs Batted In: <span>{ player.playerStats.rbi }</span></li>
              <li className="list-group-item">Strike Outs: <span>{ player.playerStats.so }</span></li>
              <li className="list-group-item">Runs: <span>{ player.playerStats.r }</span></li>
              <li className="list-group-item">Home Runs: <span>{ player.playerStats.hr }</span></li>
              <li className="list-group-item">Stolen Bases: <span>{ player.playerStats.sb }</span></li>
              <li className="list-group-item">Caught Stealing: <span>{ player.playerStats.cs }</span></li>
            </ul>
          </div>
        )
      })
    : "NO DATA"
    )
  }
</div>
      </div>
    )

  }

}
