import '../stylesheets/homeStyle.css';
import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from "@reach/router";

export default () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [valErrors, setValErrors] = useState([]);

  const submitHandler = (event) => {
    event.preventDefault();
    let newErrors = [];
    axios.post('http://localhost:8000/api/register', {
      username,
      password,
      confirmPassword
    }, { withCredentials: true })
    .then(response => {
      navigate('/home')
      window.location.reload();
    })
    .catch(error => {
      // if error returned is longer than 4 that means there only one object returned wich is: {errors: "Username exist, pick another one"}. Instead of an array with errors
      if (error.response.data.errors.length > 4) {
        // push error message into valErrors array
        let usernameError = error.response.data.errors

        newErrors.push(usernameError);
        setValErrors(newErrors);
      } else {
        for (let i in error.response.data.errors) {
          // get error array and put the new error
          newErrors.push(error.response.data.errors[i].message);
          setValErrors(newErrors);
        }
      }

    })

  }

  return (
    <div id="register-form">
      <div id="validation-errors">
        {
          (valErrors
            ? valErrors.map((msg, idx) => {
              return (
                <div key={idx}>
                  <span id="val-msg">{ msg }</span>
                </div>
              )
            })
          : "NO DATA"
          )
        }
      </div>
      <form onSubmit={ submitHandler }>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" onChange={(event) => { setUsername(event.target.value) }} required/>

        <label htmlFor="password">Password:</label>
        <input type="password" name="password" onChange={(event) => { setPassword(event.target.value) }} required/>

        <label htmlFor="confirm-password">Confirm Password:</label>
        <input type="password" name="confirm-password" onChange={(event) => { setConfirmPassword(event.target.value) }} required/>

        <button className="btn btn-primary" type="submit" id="login-btn">Register</button>
      </form>
    </div>
  )

}
