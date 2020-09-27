import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './views/home'
import YoutubeRobot from './views/youtubeRobot'
import { Route, withRouter } from 'react-router-dom'

import Amplify, { Storage } from 'aws-amplify';
import awsmobile from './aws-exports';
Amplify.configure(awsmobile);


function App() {
  const [homeVidUrl, setHomeVidUrl] = useState("")
  
  useEffect(() => {
    const getS3Url = async (key) => {
      const url = await Storage.get(key);

      setHomeVidUrl(url);
    }

    getS3Url("vid.mp4")
  }, []);
  

  return (
    <div className="app">
      <Route exact path='/' render={() => (
        <Home url={homeVidUrl}/>
      )}/>
      <Route exact path='/robot-youtube' render={() => (
        <YoutubeRobot/>
      )}/>
    </div>
  );
}

export default withRouter(App);
