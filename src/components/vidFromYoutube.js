import React from 'react'
import '../App.css'
import YouTube from 'react-youtube';


function VidFromYouTube(props) {
  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      loop: 1,
      playlist: props.videoId
    },
  };

  return (
    <YouTube
      videoId={props.videoId}
      opts={opts}
      onReady={(event) => event.target.mute()}
      allowfullscreen/>
    
  )
}

export default VidFromYouTube;