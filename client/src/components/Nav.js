import '../stylesheets/navStyle.css';
import React from 'react';

export default () => {

  return (
    <nav className="active">
      <ul id="nav">
        <li><span><a href="/home">Home</a></span></li>
        <li>
          <form>
            <select name="fav-players" id="fav-players">
              <option value="player">Player Name</option>
              <option value="add-player">Add a new player</option>
            </select>
          </form>
        </li>
      </ul>
    </nav>
  )

}
