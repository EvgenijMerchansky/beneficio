import React from 'react';
import Login from '../Pages/SignIn/index';
import Dashboard from '../Pages/Dashboard/index';
import './App.css';
import { Router, Route, Link, browserHistory } from 'react-router'

const bgImage = require("../assets/admin-panel-background-images-5.jpg");

function App() {
  console.log(browserHistory, 'browserHistory');
  
  return (
    <div
      className="App"
      name="some name"
      style={{ backgroundImage: "url("+bgImage+")" }}
    >
      <Router history={browserHistory}>
        <Route path="/" exact component={() => <Login history={browserHistory}/>}/>
        <Route path="/dashboard" exact component={() => <Dashboard history={browserHistory}/>} />
      </Router>
    </div>
  );
}

export default App;
