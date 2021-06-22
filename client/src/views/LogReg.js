import '../stylesheets/homeStyle.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../components/Nav';
import Login from '../components/Login';

export default props => {

  // use to track screen size for mobile responsiveness
  const [width, setWidth] = useState(window.innerWidth);

  // when screen resizes it will set the width to the current screen width
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  if (width > 750) {
    return (
      <div id="desktop">
        <Nav />
        <h1>Login</h1>
      </div>
    )
  } else {
    return (
      <div id="mobile">
        <Nav />
        <p>mobile</p>
      </div>
    )
  }

}
