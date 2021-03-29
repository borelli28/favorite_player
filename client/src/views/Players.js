import '../stylesheets/playersStyle.css';
import React from 'react';
import Nav from '../components/Nav';

export default () => {

  return (
    <div>
      <Nav />
      <div id="table-container">
        <table className="table table-strip table-hover" id="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Team</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mike Trout</td>
              <td>LAA</td>
              <td>CF</td>
              <td>
                <button className="btn btn-danger">Remove</button> <button className="btn btn-warning">Favorite</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary" type="submit" id="add-player-btn">Add Player</button>
    </div>
  )

}
