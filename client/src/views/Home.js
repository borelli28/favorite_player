import '../stylesheets/homeStyle.css';
import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import axios from 'axios';


export default props => {
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState([]);
  const [getBool, setGetBool] = useState(false);
  const [username, setUsername] = useState("");

  const { userLogged, setUserLogged } = props;
  // const { id, setId } = props;
  const { playerInfo, setPlayerInfo } = props;

  const { homeRender, setHomeRender} = props;

  // use to track screen size for mobile responsiveness
  const [width, setWidth] = useState(window.innerWidth);

  // when screen resizes it will set the width to the current screen width
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {

    let thePlayersInfo;
    let playerStats = [];
    let userPlayerIds;
    let newPlayers = players;

    // get the user object from the server
    fetch('http://localhost:8000/api/user', {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(user => {

      setUserLogged(user)

      // gets all the players that user added from the DB
      axios.get('http://localhost:8000/api/players', { withCredentials: true })
      .then(response => {

        thePlayersInfo = response.data;

        userPlayerIds = user["playerIds"];


        // gets all the player stats by looping trough each player id in playerIds and
        // request the data to the api and appending it to playerStats
        for (let val in userPlayerIds) {

          // ask for the new data and assign the response to playerStats
          axios.get(`http://lookup-service-prod.mlb.com/json/named.search_player_all.bam/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='2021'&player_id='${userPlayerIds[val]}'`)
            .then(res => {

              // console.log(res.data.sport_hitting_tm.queryResults.row)
              playerStats.push(res.data.sport_hitting_tm.queryResults.row);

              // put player info and stats in the same array
              // grab each playerInfo and stat and put them in the same object(playerinfo is the first element and second element is the stats)
              for (let i in thePlayersInfo) {
                let tempObj = {};

                tempObj["info"] = thePlayersInfo[i];
                tempObj["stats"] = playerStats[i];

                newPlayers.push(tempObj);

                setPlayers(newPlayers);
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
  console.log(width);

  // deletes all data in the database
  const wipeDBClean = () => {
    axios.delete('http://localhost:8000/api/delete/data', { withCredentials: true })
      .then(res => {
        console.log("and is gone.")
      })
      .catch(err => console.log("the data could not be deleted: " + err))
  }

  if (width > 750) {
    return (
      <div id="desktop">
        <Nav />
        <h1>My Players</h1>
        <button className="btn btn-danger" onClick={ wipeDBClean }>wipe all db data</button>
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
                        <td>sdger</td>
                        <td>{ player.info.favInfo.name }</td>
                        <td>{ player.stats.team_full }</td>
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
