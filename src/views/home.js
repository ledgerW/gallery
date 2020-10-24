import React, { Component } from 'react'
import '../App.css'
import FullScreenVid from '../components/fullScreenVid'
import NavButton from '../components/navButton'


function Home(props) {
  return (
    <FullScreenVid>
      <video autoPlay muted loop src={props.url}></video>
      <NavButton class="nav br" to="alone-on-earth"/>
    </FullScreenVid>
  )
}

export default Home;