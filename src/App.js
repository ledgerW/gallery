import React, { useState, useEffect } from 'react'
import './App.css'
import { Route, withRouter } from 'react-router-dom'
import Home from './views/home'
import AloneOnEarth from './views/aloneOnEarth'
import FullScreenWork from './views/fullScreenWork'

import Amplify, { Storage } from 'aws-amplify'
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions'
import config from './config'
Amplify.configure(config)
Amplify.addPluggable(new AmazonAIPredictionsProvider())


// Content Settings
const backgroundVid = 'home.mp4'


function App() {
  const [homeVidUrl, setHomeVidUrl] = useState("")
  
  useEffect(() => {
    const getS3Url = async (key) => {
      const url = await Storage.get(key);

      setHomeVidUrl(url);
    }

    getS3Url(backgroundVid)
  }, []);
  

  return (
    <div className="app">
      {/*
      <Navbar fixed="top" bg="primary" variant="dark">
        <Navbar.Brand href="/">Zara Kahan</Navbar.Brand>
      </Navbar>
      */}
      <Route exact path='/' render={() => (
        <Home url={homeVidUrl}/>
      )}/>
      <Route exact path='/alone-on-earth' render={() => (
        <AloneOnEarth/>
      )}/>
      <Route exact path='/:workTitle' render={() => (
        <FullScreenWork/>
      )}/>
    </div>
  );
}

export default withRouter(App);
