import React, { Component } from 'react'
import '../App.css'
import FullScreenVid from '../components/fullScreenVid'
import NavButton from '../components/navButton'


function Home(props) {
  const homeVidSource = "vid.mp4"

  return (
    <div>
      <FullScreenVid src={homeVidSource}/>

      <NavButton class="nav br" to="robot-youtube"/>
    </div>
  )
}

export default Home;