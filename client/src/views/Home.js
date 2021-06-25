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
  const { id, setId } = props;
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

  // useEffect(()=>{
  //   fetch('http://localhost:8000/test/send-cookie', {
  //     method: 'POST',
  //     credentials: 'include'
  //   })
  //   .then(response => {
  //     console.log(response)
  //   })
  //   .catch(error=>console.log(error))
  // },[])
  //
  // useEffect(()=>{
  //
  // },[])

  // const sendCookie = (event) => {
  //   event.preventDefault();
  //
  //     axios.get('http://localhost:8000/api/user')
  //       .then( res => {
  //         setUsername(res.data.users)
  //       });
  //     console.log("leaving use effect");
  // }

  const sendCookie = (event) => {
    event.preventDefault();

      fetch('http://localhost:8000/test/send-cookie', {
        method: 'POST',
        credentials: 'include'
      })
      .then( res => {
        setUsername(res)
      });
      console.log("leaving use effect");
  }

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
  console.log("response");
  console.log(username);

  if (width > 750) {
    return (
      <div id="desktop">
        <Nav />
        <h1>My Players</h1>
        <button className="btn btn-light" type="button" onClick={ sendCookie }>Send Cookie</button>
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
                        <td>{ player.favStats.team_full }</td>
                        <td>{ player.favInfo.name }</td>
                        <td>{ player.favInfo.position }</td>
                        <td>{ player.favStats.ab }</td>
                        <td>{ player.favStats.h }</td>
                        <td>{ player.favStats.tb }</td>
                        <td>{ player.favStats.obp }</td>
                        <td>{ player.favStats.rbi }</td>
                        <td>{ player.favStats.so }</td>
                        <td>{ player.favStats.r }</td>
                        <td>{ player.favStats.hr }</td>
                        <td>{ player.favStats.sb }</td>
                        <td>{ player.favStats.cs }</td>
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
      <div id="mobile">
        <Nav />
        <h1>My Players</h1>
        <div id="table-container">
          <table className="table table-hover" id="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>AB</th>
                <th>H</th>
                <th>RBI</th>
              </tr>
            </thead>
            <tbody>
              {
                (players
                  ? players.map((player, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{ player.favInfo.name }</td>
                        <td>{ player.favInfo.position }</td>
                        <td>{ player.favStats.ab }</td>
                        <td>{ player.favStats.h }</td>
                        <td>{ player.favStats.rbi }</td>
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


}
