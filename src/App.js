import React, { Component } from 'react';
import {  BrowserRouter as Router, Switch,  Route,  Link } from 'react-router-dom'
import './App.css';
import Home from './home/home'
import About from './about/about'
import NoMatch from './no-match'
import SearchResult from './search-result/search-result'
import Profile from './profile/profile'

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Github-Profile</h1>
          <div>
            <ul className="menu unstyled inline light">
              <li className="active"><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>


          </div>
        </header>  
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/search" component={SearchResult}/>
            <Route path="/profile/:user" component={Profile}/>
            <Route component={NoMatch} />
          </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
