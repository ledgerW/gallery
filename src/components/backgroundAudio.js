import React from 'react'
import '../App.css'
import ReactAudioPlayer from 'react-audio-player';


function BackgroundAudio(props) {
  return (
    <ReactAudioPlayer
      src={props.src}
      autoPlay={true}
      controls={false}
      loop={true}
      volume={0.6}
    />
  )
}

export default BackgroundAudio;