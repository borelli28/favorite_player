import '../stylesheets/playerNAStyle.css';
import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';

export default () => {
  // this page will be render if in AddPlayerTwo page, the get request to the API( player stats info)
  // not returns any usefull data
  return (
    <div id="playerNaDiv">
      <nav>
        <Nav />
      </nav>
      <p>Sorry, But this Player Information is not available at the moment</p>
    </div>
  )

}
