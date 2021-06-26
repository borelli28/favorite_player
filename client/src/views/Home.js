import '../stylesheets/homeStyle.css';
import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import axios from 'axios';
import { navigate } from "@reach/router";


export default props => {
  const [players, setPlayers] = useState([]);
  // const [getBool, setGetBool] = useState(false);
  const [username, setUsername] = useState("");

  const { userLogged, setUserLogged } = props;

  // use to track screen size for mobile responsiveness
  const [width, setWidth] = useState(window.innerWidth);

  // when screen resizes it will set the width to the current screen width
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {

  // axios.delete('http://localhost:8000/api/delete/data', { withCredentials: true })
  //   .then(res => {
  //     console.log("and is gone.")
  //   })
  //   .catch(err => console.log("the data could not be deleted: " + err))

    let thePlayersInfo;
    let playerStats = [];
    let userPlayerIds;
    // clears out the players in the hook to fix duplicates players bug
    setPlayers([]);
    let newPlayers = [];

    // get the user object from the server
    fetch('http://localhost:8000/api/user', {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(user => {
      console.log("User:");
      console.log(user);
      setUserLogged(user)

      // gets all the players that user added from the DB
      axios.get('http://localhost:8000/api/players', { withCredentials: true })
      .then(response => {

        thePlayersInfo = response.data;

        userPlayerIds = user["playerIds"];

        console.log("playerIds:")
        console.log(userPlayerIds)

        // gets all the player stats by looping trough each player id in playerIds and
        // request the data to the api and appending it to playerStats
        for (let val in userPlayerIds) {

          // ask for the new data and assign the response to playerStats
          axios.get(`http://lookup-service-prod.mlb.com/json/named.search_player_all.bam/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='2021'&player_id='${userPlayerIds[val]}'`)
            .then(res => {

              // check for undefined stats
              if (res.data.sport_hitting_tm.queryResults.row !== undefined) {
                playerStats.push(res.data.sport_hitting_tm.queryResults.row);
              }

              // put player info and stats in the same array
              // grab each playerInfo and stat and put them in the same object(playerinfo is the first element and second element is the stats)
              let tempObj = {};

              tempObj["info"] = thePlayersInfo[val];
              tempObj["stats"] = playerStats[val];

              newPlayers.push(tempObj);

              // console.log("newPlayers obj");
              // console.log(newPlayers);

              // iterate trough object to check for undefined data returned by the api
              for (let obj in newPlayers) {
                // only put object in players if it not include undefined data
                if (newPlayers[obj]["info"] != undefined && newPlayers[obj]["stats"]!= undefined) {
                  setPlayers(newPlayers);
                  console.log("players setted");
                } else {
                  console.log(`this object: ${newPlayers[obj]} returned some undefined data`);

                }
              }

            })
            .catch(err => console.log(err))
        }

      })
      .catch(error => {
      })
    });

  },[])

  console.log("The Players:")
  console.log(players);

  // deletes all data in the database
  const wipeDBClean = () => {
    axios.delete('http://localhost:8000/api/delete/all/players', { withCredentials: true })
      .then(res => {
        console.log("all players gone...")
      })
      .catch(err => console.log("the data could not be deleted: " + err))

    axios.delete('http://localhost:8000/api/delete/all/users', { withCredentials: true })
      .then(res => {
        console.log("and is gone.")
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
                        <td>{ player.stats.team_full }</td>
                        <td>{ player.info.favInfo.name }</td>
                        <td>{ player.info.favInfo.position }</td>
                        <td>{ player.stats.ab }</td>
                        <td>{ player.stats.h }</td>
                        <td>{ player.stats.tb }</td>
                        <td>{ player.stats.obp }</td>
                        <td>{ player.stats.rbi }</td>
                        <td>{ player.stats.so }</td>
                        <td>{ player.stats.r }</td>
                        <td>{ player.stats.hr }</td>
                        <td>{ player.stats.sb }</td>
                        <td>{ player.stats.cs }</td>
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
      </div>
    )

  }

}
