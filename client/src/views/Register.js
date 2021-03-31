import '../stylesheets/loginStyle.css';
import React, { useState } from 'react';
import axios from 'axios';

export default () => {
  //Create an array to store errors from the API
  const [errors, setErrors] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmitHandler = (event) => {
    event.prevent.default();
    axios.post('http://localhost:8000/api/user/new', {
      email,
      password
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      const errorResponse = err.response.data.errors; // Get the errors from err.response.data
      const errorArr = []; // Define a temp error array to push the messages in
      for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
        errorArr.push(errorResponse[key].message)
      }
      // Set Errors
      setErrors(errorArr);
    })
  }

  return (
    <div id="main-container">
      {
        errors.map((err, index) => <p key={index}>{err}</p>)
      }
      <main>
        <h2> Register </h2>
        <form>
          <label for="email"> Email </label>
          <input type="email" name="email" onChange={(event) => { setEmail(event.target.value) }} required/>

          <label for="password"> Password </label>
          <input type="password" name="password" onChange={(event) => { setPassword(event.target.value) }} required/>

          <label for="confirmPassword"> Confirm Password </label>
          <input type="password" name="confirmPassword" onChange={(event) => { setConfirmPassword(event.target.value) }} required/>

          <button className="btn btn-primary" type="submit" onClick={ onSubmitHandler }> Submit </button>
        </form>
      </main>
    </div>
  )

}
