import React, { Component } from 'react'
import '../App.css'
import FullScreenVid from '../components/fullScreenVid'
import NavButton from '../components/navButton'


function Home(props) {
  return (
    <div>
      <FullScreenVid src={props.url}/>

      <NavButton class="nav br" to="robot-youtube"/>
    </div>
  )
}

export default Home;