import React from 'react';
import './App.css';
import Home from './views/home'
import YoutubeRobot from './views/youtubeRobot'
import { Route, withRouter } from 'react-router-dom'


function App() {
  return (
    <div className="app">
      <Route exact path='/' render={() => (
        <Home/>
      )}/>
      <Route exact path='/robot-youtube' render={() => (
        <YoutubeRobot/>
      )}/>
    </div>
  );
}

export default withRouter(App);
