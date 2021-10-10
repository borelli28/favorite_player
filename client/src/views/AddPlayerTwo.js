import '../stylesheets/addTwoStyle.css';
import React, { useState, useEffect } from 'react';
import { navigate } from "@reach/router";
import axios from 'axios';
import Nav from '../components/Nav';

export default props => {
  const { playerInfo, setPlayerInfo } = props;
  const { playerStats, setPlayerStats } = props;
  const {id, setId} = props;
  // Selected player, Full name, Position & ID
  const [name, setName] = useState("");
  const [pos, setPos] = useState("");

  // use to track screen size for mobile responsiveness
  const [width, setWidth] = useState(window.innerWidth);
  // when screen resizes it will set the width to the current screen width
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  // save player info data in localStorage so if the pages gets refresh
  // user can still see the data without having to submit another form
  if (Object.keys(playerInfo).length == undefined || Object.keys(playerInfo).length == 0) {

    useEffect(()=>{
      const playerPersist = localStorage.getItem("playerInfoTemp")
      const newPlayerInfo = JSON.parse(playerPersist);
      setPlayerInfo(newPlayerInfo)
    },[])
  } else {
    useEffect(() => {
      localStorage.setItem("playerInfoTemp", JSON.stringify(playerInfo))
    }, [playerInfo])
  }

  const submitHandler = (event) => {
    event.preventDefault();

    // resets localStorage
    localStorage.setItem("playerInfoTemp", undefined);

    const getData = async () => {
      console.log("Player id: " + id)
      await axios.get(`http://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code='mlb'&player_id='${id}'`)
      .then(res => {
        console.log("API Response: ")
        console.log(res)
        localStorage.setItem("playerStatsLocal", JSON.stringify(res.data.player_info.queryResults.row))
        setPlayerStats(res.data.player_info.queryResults.row);
        localStorage.setItem("playerInfoLocal", JSON.stringify({name:name, position:pos, id:id}))
        setPlayerInfo({name:name, position:pos, id:id});

        // check if the API returned the data else it will display an error to the user
        try {
          if (res.data.player_info.queryResults.row.age.length > 0) {
            navigate("/addPlayer/3");
          }
        } catch {
          // the data returned by the API is empty so we redirect to playerNotAvailable page
          navigate("/playerNotAvailable");
        }
      })
      .catch(err => {
        console.log("some error happend while request data from API")
        console.log(err);
      });
    }
    getData();

  }

  if (width > 850) {
    return (
      <main id="desktop">
        <Nav />
        <div id="table-container">
          <table className="table table-hover" id="table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Position</th>
                <th>Team</th>
                <th>Player ID</th>
                <th>Roster Name (Jersey Name)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {
              (playerInfo.length > 0
              ? playerInfo.map((player, idx) => {
                return (
                  <tr key={idx}>
                    <td>{player.name_display_first_last}</td>
                    <td>{player.position}</td>
                    <td>{player.team_full}</td>
                    <td>{player.player_id}</td>
                    <td>{player.name_display_roster}</td>
                    <td>
                      <form onSubmit={ submitHandler } >
                        <button className="btn btn-light" id="add-player-btn" onClick={(event) => { setName(player.name_display_first_last);
                        setPos(player.position);
                      setId(player.player_id); }}>Add Player</button>
                      </form>
                    </td>
                  </tr>
                )
              })
              : <tr>
                  <td>{playerInfo.name_display_first_last}</td>
                  <td>{playerInfo.position}</td>
                  <td>{playerInfo.team_full}</td>
                  <td>{playerInfo.player_id}</td>
                  <td>{playerInfo.name_display_roster}</td>
                  <td>
                    <form onSubmit={ submitHandler } >
                      <button className="btn btn-light" id="add-player-btn" onClick={(event) => { setName(playerInfo.name_display_first_last);
                      setPos(playerInfo.position);
                    setId(playerInfo.player_id); }}>Add Player</button>
                    </form>
                  </td>
                </tr>
              )
            }
            </tbody>
          </table>
        </div>
      </main>
    )
  } else {
    return (
      <main id="mobile">
        <Nav />
        <div id="table-container">
          <table className="table table-hover" id="table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Position</th>
                <th>Team</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {
              (playerInfo.length > 0
              ? playerInfo.map((player, idx) => {
                return (
                  <tr key={idx}>
                    <td>{player.name_display_first_last}</td>
                    <td>{player.position}</td>
                    <td>{player.team_full}</td>
                    <td>
                      <form onSubmit={ submitHandler } >
                        <button className="btn btn-light" id="add-player-btn" onClick={(event) => { setName(player.name_display_first_last);
                        setPos(player.position);
                      setId(player.player_id); }}>Add</button>
                      </form>
                    </td>
                  </tr>
                )
              })
              : <tr>
                  <td>{playerInfo.name_display_first_last}</td>
                  <td>{playerInfo.position}</td>
                  <td>{playerInfo.team_full}</td>
                  <td>
                    <form onSubmit={ submitHandler } >
                      <button className="btn btn-light" id="add-player-btn" onClick={(event) => { setName(playerInfo.name_display_first_last);
                      setPos(playerInfo.position);
                    setId(playerInfo.player_id); }}>Add</button>
                    </form>
                  </td>
                </tr>
              )
            }
            </tbody>
          </table>
        </div>

      </main>
    )
  }

}
