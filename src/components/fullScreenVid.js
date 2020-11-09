import React from 'react'
import '../App.css'


function FullScreenVid(props) {
  const className = props.project || "full-screen"

  return (
    <div className={className}>
      {props.children}
    </div>
  )
}

export default FullScreenVid;