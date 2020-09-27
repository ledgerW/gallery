import React, { Component } from 'react'
import '../App.css'
import YouTube from 'react-youtube';


function FullScreenYouTube(props) {
  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      loop: 1
    },
  };

  return (
    <div className="iframe-container">
      <YouTube
        videoId={props.videoId}
        opts={opts}
        onReady={(event) => event.target.mute()}
        allowfullscreen/>
    </div>
  )
}

export default FullScreenYouTube;