// import '../stylesheets/navStyle.css';
import React, { useState } from 'react';
import { navigate } from "@reach/router";
import axios from 'axios';

export default () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8000/api/login', {
      username,
      password
    })
    .then(response=>console.log(response))
    .catch(error=>console.log(error))
  }

  return (
    <div id="login-form">
      <form onSubmit={ submitHandler }>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" onChange={(event) => { setUsername(event.target.value) }} />

        <label htmlFor="password">Password:</label>
        <input type="password" name="password" onChange={(event) => { setPassword(event.target.value) }} />

        <button className="btn btn-light" type="submit" id="search-btn">Login</button>
      </form>
    </div>
  )

}
