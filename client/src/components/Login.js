import '../stylesheets/logRegStyle.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from "@reach/router";

export default props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [valErrors, setValErrors] = useState("");

  const { userLogged, setUserLogged } = props;

  const submitHandler = (event) => {
    event.preventDefault();
    let newErrors = [];

    axios.post('http://localhost:8000/api/login', {
      username: username,
      password: password
    }, { withCredentials: true })
    .then(response => {
      console.log(response)
      navigate('/home')
    })
    .catch(error => {
      console.log(error.response.data.message);
      setValErrors(error.response.data.message);
    })
  }

  return (
    <div id="login-form">
      <div id="validation-errors">
        <span id="val-msg">{ valErrors }</span>
      </div>
      <form onSubmit={ submitHandler }>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" onChange={(event) => { setUsername(event.target.value) }} required/>

        <label htmlFor="password">Password:</label>
        <input type="password" name="password" onChange={(event) => { setPassword(event.target.value) }} required/>

        <button className="btn btn-primary" type="submit" id="login-btn">Login</button>
      </form>
    </div>
  )

}
