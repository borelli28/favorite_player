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
  const { playerStats, setPlayerStats } = props;

  // use to track screen size for mobile responsiveness
  const [width, setWidth] = useState(window.innerWidth);

  // when screen resizes it will set the width to the current screen width
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  // get the user object from the server
  useEffect(()=>{
    fetch('http://localhost:8000/api/user', {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(user => {

      console.log("User Info:")
      console.log(user);
      setUserLogged(user)
    })
  },[])


  // request player stats using player id in favInfo
  const refreshHandler = (event) => {
    event.preventDefault();

    const userPlayerIds = userLogged["playerIds"];

    // gets all the player stats by looping trough each player id in playerIds and
    // request the data to the api and appending it to playerStats
    for (let id in userPlayerIds) {
      console.log("id:")
      console.log(id);
      // ask for the new data and assign the response to playerStats
      axios.get(`http://lookup-service-prod.mlb.com/json/named.search_player_all.bam/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='2021'&player_id='${userPlayerIds[id]}'`)
        .then(res => {
          let newStats = playerStats;
          console.log("res:");
          console.log(res);
          newStats.push(res.data.sport_hitting_tm.queryResults.row);
          setPlayerStats({ newStats });
          console.log("New stats requested");

        })
        .catch(err => console.log(err))
    }
  }

  console.log("new stats");
  console.log(playerStats);

   // deletes all data in the database
  const wipeDBClean = () => {
    axios.delete("http://localhost:8000/api/delete/data", { withCredentials: true })
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
        <button className="btn btn-light" onClick={ refreshHandler }>get player stats</button>
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
                (playerStats.newStats
                  ? playerStats.newStats.map((player, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{ player.ab }</td>
                        <td>{ player.h }</td>
                        <td>{ player.tb }</td>
                        <td>{ player.obp }</td>
                        <td>{ player.rbi }</td>
                        <td>{ player.so }</td>
                        <td>{ player.r }</td>
                        <td>{ player.hr }</td>
                        <td>{ player.sb }</td>
                        <td>{ player.cs }</td>
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
