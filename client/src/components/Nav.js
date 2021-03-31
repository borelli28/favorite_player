import '../stylesheets/navStyle.css';
import React from 'react';

export default () => {

  return (
    <nav className="active">
      <ul id="nav">
        <li><span><a href="/home">Home</a></span></li>
        <li>
          <button className="btn btn-light"><a href="favorite_players">Players</a></button>
        </li>
      </ul>
    </nav>
  )

}
// <form>
//   <select name="fav-players" id="fav-players">
//     <option value="player">Player Name</option>
//     <option value="add-player">Add a new player</option>
//   </select>
// </form>
