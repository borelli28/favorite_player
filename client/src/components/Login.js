import '../stylesheets/logRegStyle.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from "@reach/router";
import {Redirect} from 'react-router-dom';

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
      navigate('/home')
      window.location.reload();
    })
    .catch(error => {
      try {
        console.log(error.response.data.message);
        setValErrors(error.response.data.message);
      } catch {
        console.log(error)
        navigate("/")
      }

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
