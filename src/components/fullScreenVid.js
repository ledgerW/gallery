import React, { Component } from 'react'
import '../App.css'


function FullScreenVid(props) {
  return (
    <div className="full-screen">
      <video autoPlay muted loop src={props.src}></video>
    </div>
  )
}

export default FullScreenVid;