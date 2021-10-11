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

    // clears out the players in the state to fix duplicates players bug
    setPlayers([]);

    // get the user object from the server
    axios.get('http://localhost:8000/api/user/', { withCredentials: true })
    .then(user => {
      setUserLogged(user.data)

      for (let i in user.data.players) {
        let playerId = user.data.players[i].playerInfo.id;

        // now get fresh stats data from the API, and PUT them in the user players object
        axios.get(`https://statsapi.mlb.com/api/v1/people/${playerId}?hydrate=currentTeam,team,stats(type=[yearByYear,yearByYearAdvanced,careerRegularSeason,careerAdvanced,availableStats](team(league)),leagueListId=mlb_hist)&site=en`)
        .then(res => {
          console.log("API response: ")
          console.log(res.data.people[0].stats[0].splits[res.data.people[0].stats[0].splits.length -1])
          user.data.players[i].playerStats = res.data.people[0].stats[0].splits[res.data.people[0].stats[0].splits.length -1];
          setPlayers(user.data.players);
        })
        .catch(error => {
          console.log(error)
          // console.log(error.response.status);
          // if (error.response.status == 401) {
          //   navigate('/')
          //   window.location.reload();
          // }
            navigate('/')
            window.location.reload();
        })
      }

    });
  },[])

  console.log("players:")
  console.log(players)

  if (width > 750) {
    return (
      <div id="desktop">
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
                    console.log("individual player")
                    console.log(player)
                    return (
                      <tr key={idx}>
                        <td>{ player.playerStats.team.name }</td>
                        <td>{ player.playerInfo.name }</td>
                        <td>{ player.playerInfo.position }</td>
                        <td>{ player.playerStats.stat.atBats }</td>
                        <td>{ player.playerStats.stat.hits }</td>
                        <td>{ player.playerStats.stat.totalBases }</td>
                        <td>{ player.playerStats.stat.obp }</td>
                        <td>{ player.playerStats.stat.rbi }</td>
                        <td>{ player.playerStats.stat.strikeOuts }</td>
                        <td>{ player.playerStats.stat.runs }</td>
                        <td>{ player.playerStats.stat.homeRuns }</td>
                        <td>{ player.playerStats.stat.stolenBases }</td>
                        <td>{ player.playerStats.stat.caughtStealing }</td>
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
