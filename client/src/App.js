import './App.css';
import { Router } from '@reach/router';
import Main from './views/Main';
import Login from './views/Login';
import Register from './views/Register';

function App() {
  return (
    <div className="App">
      <Router>
        <Login path="/" />
        <Register path="/register" />
      </Router>
    </div>
  );
}

export default App;
