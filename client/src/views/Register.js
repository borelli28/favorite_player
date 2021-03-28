import '../stylesheets/loginStyle.css';
import React from 'react';

export default () => {

  return (
    <div id="main-container">
      <main>
        <h2> Register </h2>
        <form>
          <label for="email"> Email </label>
          <input type="email" name="email" required/>

          <label for="password"> Password </label>
          <input type="password" name="password" required/>

          <label for="confirmPassword"> Confirm Password </label>
          <input type="password" name="confirmPassword" required/>

          <button className="btn btn-primary" type="submit"> Submit </button>
        </form>
      </main>
    </div>
  )

}
