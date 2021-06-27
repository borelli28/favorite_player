// import '../stylesheets/navStyle.css';
import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from "@reach/router";

export default () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8000/api/register', {
      username,
      password,
      confirmPassword
    })
    .then(response => {
      console.log(response)
      navigate('/home')
    })
    .catch(error=>console.log(error))
  }

  return (
    <div id="register-form">
      <form onSubmit={ submitHandler }>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" onChange={(event) => { setUsername(event.target.value) }} />

        <label htmlFor="password">Password:</label>
        <input type="password" name="password" onChange={(event) => { setPassword(event.target.value) }} />

        <label htmlFor="confirm-password">Confirm Password:</label>
        <input type="password" name="confirm-password" onChange={(event) => { setConfirmPassword(event.target.value) }} />

        <button className="btn btn-light" type="submit" id="search-btn">Register</button>
      </form>
    </div>
  )

}
