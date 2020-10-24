import React, { Component } from 'react'
import '../App.css'


function FullScreenVid(props) {
  return (
    <div className="full-screen">
      {props.children}
    </div>
  )
}

export default FullScreenVid;