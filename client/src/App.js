import './App.css';
import { Router } from '@reach/router';
import Login from './views/Login';
import Register from './views/Register';
import Home from './views/Home';
import Players from './views/Players';

function App() {
  return (
    <div className="App">
      <Router>
        <Login path="/" />
        <Register path="/register" />
        <Home path="/home" />
        <Players path="/favorite_players" />
      </Router>
    </div>
  );
}

export default App;
