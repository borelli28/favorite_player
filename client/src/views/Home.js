import '../stylesheets/homeStyle.css';
import React from 'react';
import Nav from '../components/Nav';

export default props => {

  return (
    <div>
      <Nav />
      <h1 id="player-name">Mike Trout</h1>
      <div id="table-container">
        <table className="table table-hover" id="table">
          <thead>
            <tr>
              <th>Team</th>
              <th>Age</th>
              <th>Position</th>
              <th>AB</th>
              <th>H</th>
              <th>RBI</th>
              <th>R</th>
              <th>SB</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>LAA</td>
              <td>29</td>
              <td>CF</td>
              <td>100</td>
              <td>30</td>
              <td>25</td>
              <td>18</td>
              <td>7</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )

}
