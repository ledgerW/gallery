import React from 'react'
import '../App.css'
import FullScreenYoutube from '../components/fullScreenYoutube'
import NavButton from '../components/navButton'


function YoutubeRobot(props) {
  const videoId = "Bpnt43XhQyQ"

  return (
    <div>
      <FullScreenYoutube videoId={videoId}/>

      <NavButton class="nav tl" to="/"/>
    </div>
  )
}

export default YoutubeRobot;