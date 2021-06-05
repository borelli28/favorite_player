import '../stylesheets/playerNAStyle.css';
import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';

export default () => {

  return (
    <div id="playerNaDiv">
      <nav>
        <Nav />
      </nav>
      <p>Sorry, But this Player Information is not available at the moment</p>
    </div>
  )

}
