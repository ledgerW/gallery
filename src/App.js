import React, { useState, useEffect } from 'react'
import './App.css'
import { Route, withRouter } from 'react-router-dom'
import Home from './views/home'
import AloneOnEarth from './views/aloneOnEarth'
import Batik1 from './views/batik1'
import Batik2 from './views/batik2'
import Batik3 from './views/batik3'
import Bird from './views/bird'

import Amplify, { Storage } from 'aws-amplify'
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions'
import awsmobile from './aws-exports'
Amplify.configure(awsmobile)
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
      <Route exact path='/half-faced-mother-still-tongued-child' render={() => (
        <Batik1/>
      )}/>
      <Route exact path='/ask-the-sky' render={() => (
        <Batik2/>
      )}/>
      <Route exact path='/not-afraid' render={() => (
        <Batik3/>
      )}/>
      <Route exact path='/the-one-who-moves' render={() => (
        <Bird/>
      )}/>
    </div>
  );
}

export default withRouter(App);
