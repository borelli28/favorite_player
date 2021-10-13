import '../stylesheets/addTwoStyle.css';
import React, { useState, useEffect } from 'react';
import { navigate } from "@reach/router";
import axios from 'axios';
import Nav from '../components/Nav';

export default props => {
  const { playerInfo, setPlayerInfo } = props;
  const { playerStats, setPlayerStats } = props;
  const {id, setId} = props;
  const { setAlert } = props;

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

    // clear previous alerts
    setAlert([])

    // resets localStorage
    localStorage.setItem("playerInfoTemp", undefined);

    const getData = async () => {
      console.log("Player id: " + id)
      await axios.get(`https://statsapi.mlb.com/api/v1/people/${id}?hydrate=currentTeam,team,stats(type=[yearByYear,yearByYearAdvanced,careerRegularSeason,careerAdvanced,availableStats](team(league)),leagueListId=mlb_hist)&site=en`)
      .then(res => {
        console.log("API Response: ")
        console.log(res)
        console.log("Player Data:")
        console.log(res.data.people[0].stats[0].splits[res.data.people[0].stats[0].splits.length -1])
        localStorage.setItem("playerStatsLocal", JSON.stringify(res.data.people[0].stats[0].splits[res.data.people[0].stats[0].splits.length -1]))
        setPlayerStats(res.data.people[0].stats[0].splits[res.data.people[0].stats[0].splits.length -1]);
        localStorage.setItem("playerInfoLocal", JSON.stringify({name:name, position:pos, id:id}))
        setPlayerInfo({name:name, position:pos, id:id});

        // check if the API returned the data else it will display an error to the user
        try {
          if (res.data.people.length > 0) {
            console.log("Inside Try block:")
            console.log(res)

            let userObj;
            let playerObj = {};
            let userPlayers;
            axios.get('http://localhost:8000/api/user/', { withCredentials: true })
            .then(user => {

              userObj = user;

              // get user players and append new player into it
              userPlayers = user.data.players;
              // convert local storage item into json object
              let theInfo = JSON.parse(localStorage.getItem("playerInfoLocal"));
              let theStats = JSON.parse(localStorage.getItem("playerStatsLocal"));

              playerObj["playerInfo"] = theInfo ;
              playerObj["playerStats"] = theStats;

              userPlayers.push(playerObj)

              let userId = userObj.data._id;

              // put the new players into the user
              axios.put(`http://localhost:8000/api/user/${userId}/update`, {
                players: userPlayers
              }, { withCredentials: true })
              .then(response => {
                console.log("Player added! Now returning the server response")
                console.log(response)
                navigate("/players")
              })
              .catch(error => {
                console.log(error);
                setAlert(["Please wait a minute before adding or removing a Player"]);
                navigate("/players")
              })
            });
          }
        } catch {
          // the data returned by the API is empty so we redirect to playerNotAvailable page
          navigate("/playerNotAvailable");
        }
      })
      .catch(err => {
        console.log("some error happend while requesting data from API")
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
