import React from 'react'
import '../App.css'
import FullScreenVid from '../components/fullScreenVid'
import NavButton from '../components/navButton'


function Home(props) {
  return (
    <FullScreenVid>
      {/* video tag must be first (TODO: address this) */}
      <video autoPlay muted loop src={props.url}></video>
      <NavButton class="nav batik1" to="full-screen/half-faced-mother-still-tongued-child"/>
      <NavButton class="nav batik2" to="full-screen/ask-the-sky"/>
      <NavButton class="nav bird" to="full-screen/the-one-who-moves"/>
      <NavButton class="nav aoe" to="vid-poem/alone-on-earth"/>
      <NavButton class="nav question" to="vid-poem/question-why-am-i-here"/>
      <NavButton class="nav not-afraid" to="full-screen/not-afraid"/>
    </FullScreenVid>
  )
}

export default Home;