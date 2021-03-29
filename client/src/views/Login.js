import '../stylesheets/loginStyle.css';
import React from 'react';

export default () => {

  const onSubmitHandler = (event) => {
    event.prevent.default();
  }
  
  return (
    <div id="main-container">
      <main>
        <h2>Login</h2>
        <form onSubmit={ onSubmitHandler }>
          <label for="email">Email</label>
          <input type="email" name="email" required/>

          <label for="password">Password</label>
          <input type="password" name="password" required/>

          <button className="btn btn-primary" type="submit"> Login </button>
        </form>
        <a href="/register">or Register Here</a>
      </main>
    </div>
  )

}
