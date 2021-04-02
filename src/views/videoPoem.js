import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import '../App.css'
import { Storage } from 'aws-amplify'
import VidFromYoutube from '../components/vidFromYoutube'
import Poem from '../components/poem'
import BackgroundAudio from '../components/backgroundAudio'
import Youtube from '../apis/youtube'
import FullScreenVid from '../components/fullScreenVid'
import vidPoemCatalog from '../art/vidPoems/catalog'


function VideoPoem() {
  const [videoId, setVideoId] = useState()
  const [audioUrl, setAudioUrl] = useState()
  const [ready, setReady] = useState()
  const { workTitle } = useParams();
  const vidPoem = vidPoemCatalog[workTitle.replaceAll('-','')]
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const location = (position.coords.latitude + "," + position.coords.longitude);

      Youtube.get('/search', {
        params: {
          part: 'snippet',
          maxResults: vidPoem.maxResults,
          locationRadius: vidPoem.locationRadius,
          type: 'video',
          q: vidPoem.phrase,
          location: location,
          key: process.env.REACT_APP_YOUTUBE_KEY
        }
      }).then((res) => {
        const newVidIds = res.data.items
        const selectedVid = newVidIds[Math.floor(Math.random()*newVidIds.length)];
        setVideoId(selectedVid.id.videoId)
      })
    });
  }, [workTitle]);


  useEffect(() => {
    const getS3Url = async (key) => {
      const url = await Storage.get(key);
      setAudioUrl(url);
    }

    console.log(workTitle.concat('.wav'))
    getS3Url(workTitle.concat('.wav'))
  }, [workTitle]);


  useEffect(() => {
    setTimeout(() => {
      setReady(true)
    }, vidPoem.delay)
  }, [workTitle]);


  return (
    <div>
      {(videoId && audioUrl) && (
      <div>
        <FullScreenVid>
          <VidFromYoutube videoId={videoId}/>
          <BackgroundAudio src={audioUrl}/>
          {ready && (
            <Poem content={vidPoem.poem} speechToText={true} voice={vidPoem.voice}/>
          )}
        </FullScreenVid>
      </div>
      )}
    </div>
  )
}


export default VideoPoem;