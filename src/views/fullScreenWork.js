import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import '../App.css'
import FullScreenVid from '../components/fullScreenVid'
import { Storage } from 'aws-amplify'


// Content Settings
//const vidFileName = 'BatikHidupAkhir.mp4'

const isTitleMuted = {
  halffacedmotherstilltonguedchild: 'True',
  askthesky: 'True',
  notafraid: 'False',
  theonewhomoves: 'False'
}


function FullScreenWork() {
  const [vidUrl, setVidUrl] = useState("")
  const { workTitle } = useParams();
  let muted;
  let muteTitle;
  
  useEffect(() => {
    const getS3Url = async (key) => {
      const url = await Storage.get(key);

      setVidUrl(url);
    }

    muteTitle = workTitle.replace('-','')
    console.log(muteTitle);
    muted = isTitleMuted.muteTitle
    getS3Url(workTitle.concat('.mp4'))
  }, [workTitle]);

  return (
    <FullScreenVid project='full-screen-batik'>
      {/* video tag must be first (TODO: address this) */}
      <video autoPlay loop src={vidUrl}></video>
    </FullScreenVid>
  )
}

export default FullScreenWork;