// import '../stylesheets/navStyle.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from "@reach/router";

export default props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { userLogged, setUserLogged } = props;

  const submitHandler = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8000/api/login', {
      username: username,
      password: password
    })
    .then(response => {
      console.log("in then");
      console.log(response)
      navigate('/home')
    })
    .catch(error=>console.log(error))
  }

  const sendCookie = (event) => {
    event.preventDefault();

    fetch('http://localhost:8000/test/send-cookie', {
      method: 'POST',
      credentials: 'include'
    })
    .then(response => {
      console.log(response)
    })
    .catch(error=>console.log(error))
  }

  useEffect(() => {
    fetch('http://localhost:8000/test/cookie', {
      method: 'GET',
      credentials: 'include'
    });
  }, []);

  // useEffect(() => {
  //   axios.get('http://localhost:8000/api/user', { withCredentials: true })
  //     .then(response => {
  //       console.log(response)
  //       navigate('/home')
  //     })
  //     .catch(error => console.log(error))
  //
  // }, []);

  return (
    <div id="login-form">
      <form onSubmit={ submitHandler }>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" onChange={(event) => { setUsername(event.target.value) }} />

        <label htmlFor="password">Password:</label>
        <input type="password" name="password" onChange={(event) => { setPassword(event.target.value) }} />

        <button className="btn btn-light" type="submit" id="login-btn">Login</button>
      </form>
      <button className="btn btn-light" type="button" onClick={ sendCookie }>send cookie to server</button>
    </div>
  )

}
