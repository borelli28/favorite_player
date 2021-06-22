// import '../stylesheets/navStyle.css';
import React, { useState } from 'react';
import { navigate } from "@reach/router";
import axios from 'axios';
const jwt = require("jsonwebtoken");

export default () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    login: async(req, res) => {
    const user = await User.findOne({ username: req.body.email });

    if(user === null) {
        // email not found in users collection
        return res.sendStatus(400);
    }

    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if(!correctPassword) {
        // password wasn't a match!
        return res.sendStatus(400);
    }

    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);

    // note that the response object allows chained calls to cookie and json
    res
        .cookie("usertoken", userToken, secret, {
            httpOnly: true
        })
        .json({ msg: "success!" });
    }

  }

  return (
    <div id="login-form">
      <form onSubmit={ submitHandler }>
        <label for="username">Username:</label>
        <input type="text" name="username" onChange={(event) => { setUsername(event.target.value) }} />

        <label for="password">Password:</label>
        <input type="text" name="password" onChange={(event) => { setPassword(event.target.value) }} />

        <button className="btn btn-light" type="submit" id="search-btn">Login</button>
      </form>
    </div>
  )

}
