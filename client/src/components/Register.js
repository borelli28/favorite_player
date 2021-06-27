// import '../stylesheets/navStyle.css';
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
    })
    .then(response => {
      console.log(response)
      navigate('/home')
    })
    .catch(error => {
      // console.log("raw response:");
      // console.log(error.response.data.errors.length);
      // if error returned is longer than 4 that means there only one object returned wich is: {errors: "Username exist, pick another one"}. Instead of an array with errors
      if (error.response.data.errors.length > 4) {
        // push error message into valErrors array
        let usernameError = error.response.data.errors

        newErrors.push(usernameError);
        setValErrors(newErrors);
      } else {
        for (let i in error.response.data.errors) {
          // get error array and put the new error
          console.log("error:")
          console.log(error.response.data.errors[i]);
          newErrors.push(error.response.data.errors[i].message);
          setValErrors(newErrors);
          console.log("newErrors set");
          console.log(valErrors);
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

        <button className="btn btn-light" type="submit" id="search-btn">Register</button>
      </form>
    </div>
  )

}
