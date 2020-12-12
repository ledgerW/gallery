import React from 'react'
import '../App.css'
import FullScreenVid from '../components/fullScreenVid'
import NavButton from '../components/navButton'


function Home(props) {
  return (
    <FullScreenVid>
      {/* video tag must be first (TODO: address this) */}
      <video autoPlay muted loop src={props.url}></video>
      <NavButton class="nav batik" to="batik"/>
      <NavButton class="nav bird" to="bird"/>
      {/*<NavButton class="nav aoe" to="alone-on-earth"/>*/}
    </FullScreenVid>
  )
}

export default Home;