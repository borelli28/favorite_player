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
      username,
      password
    })
    .then(response => {
      console.log(response)
      setUserLogged(true);
      navigate('/home')
    })
    .catch(error=>console.log(error))
    setUserLogged(false);
  }

  useEffect(() => {
    axios.get('http://localhost:8000/api/user')
      .then(response => {
        console.log(response)
        navigate('/home')
      })
      .catch(error => console.log(error))

  }, []);
  console.log("user logged:")
  console.log(userLogged);

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
