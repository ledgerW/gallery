import React, { useState, useEffect } from 'react'
import './App.css'
import Home from './views/home'
import AloneOnEarth from './views/aloneOnEarth'
import { Route, withRouter } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';

import Amplify, { Storage } from 'aws-amplify'
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions'
import awsmobile from './aws-exports'
Amplify.configure(awsmobile)
Amplify.addPluggable(new AmazonAIPredictionsProvider())


// Content Settings
const backgroundVid = 'vid.mp4'


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
    </div>
  );
}

export default withRouter(App);
