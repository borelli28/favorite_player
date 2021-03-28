import '../stylesheets/loginStyle.css';
import React from 'react';

export default () => {

  return (
    <div id="main-container">
      <main>
        <h2>Login</h2>
        <form>
          <label for="email">Email</label>
          <input type="email" name="email" required/>

          <label for="password">Password</label>
          <input type="password" name="password" required/>

          <button className="btn btn-primary" type="submit" >Login</button>
        </form>
        <a href="#">Or Sign Up Here</a>
      </main>
    </div>
  )

}
