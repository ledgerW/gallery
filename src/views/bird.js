import React, { useState, useEffect } from 'react'
import '../App.css'
import FullScreenVid from '../components/fullScreenVid'
import { Storage } from 'aws-amplify'


// Content Settings
const vidContent = 'bird.mp4'


function Bird() {
  const [vidUrl, setVidUrl] = useState("")
  
  useEffect(() => {
    const getS3Url = async (key) => {
      const url = await Storage.get(key);

      setVidUrl(url);
    }

    getS3Url(vidContent)
  }, []);

  return (
    <FullScreenVid project='full-screen-batik'>
      {/* video tag must be first (TODO: address this) */}
      <video autoPlay loop src={vidUrl}></video>
    </FullScreenVid>
  )
}

export default Bird;