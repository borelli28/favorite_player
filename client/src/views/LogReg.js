import '../stylesheets/homeStyle.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from '../components/Login';
import Register from '../components/Register';


export default props => {
  const [regForm, setRegForm] = useState(false);

  const { userLogged, setUserLogged } = props;

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
        {
          (regForm
            ? <div>
                <Register />
                <button className="btn btn-light" onClick={(event) => { setRegForm(false) }}>Go to Login Form</button>
              </div>
            : <div>
                <Login userLogged={userLogged} setUserLogged={setUserLogged}/>
                <button className="btn btn-light" onClick={(event) => { setRegForm(true) }}>or Register Here</button>
              </div>
          )
        }
      </div>
    )
  } else {
    return (
      <div id="desktop">
        {
          (regForm
            ? <div>
                <Register />
                <button className="btn btn-light" onClick={(event) => { setRegForm(false) }}>Go to Login Form</button>
              </div>
            : <div>
                <Login userLogged={userLogged} setUserLogged={setUserLogged}/>
                <button className="btn btn-light" onClick={(event) => { setRegForm(true) }}>or Register Here</button>
              </div>
          )
        }
      </div>
    )
  }

}
