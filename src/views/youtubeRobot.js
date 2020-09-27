import React, { useState, useEffect } from 'react';
import '../App.css'
import { Storage } from 'aws-amplify';
import FullScreenYoutube from '../components/fullScreenYoutube'
import FullScreenText from '../components/fullScreenText'
import BackgroundAudio from '../components/backgroundAudio'
import NavButton from '../components/navButton'
import Youtube from '../apis/youtube';


function YoutubeRobot(props) {
  const [videoId, setVideoId] = useState()
  const [audioUrl, setAudioUrl] = useState()

  const phrase = "underwater";

  const overlayText = `
  I swim underneath where the brightness comes  from,
  now I am in half, now I wear the world like a wound on my mouth. for so long I wanted to hold things like the sky, to have brightness and flying in my breath
  but that is not me, I was stolen
  or I am close to dying or
  I am sick, and I will die of this sickness
  I will never recover, I die of the same thing 
  over and over because this is a great system
  now we know ourselves, we can fight to the death, our names are precious and we have many names in all the great books and we
  kiss the books with our deathly mouths, our
  judgment - like love - was born 
  from civilizations so far away and long dead
  just air, just a kiss for our poor mouths
  I love you, I love you, I love you
  I am sorry because no one has ever
  known what to say because this 
  is a dark river and no one else will
  ever be here.
  `;
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const location = (position.coords.latitude + "," + position.coords.longitude);

      Youtube.get('/search', {
        params: {
          part: 'snippet',
          maxResults: 10,
          locationRadius: '10mi',
          type: 'video',
          q: phrase,
          location: location,
          key: process.env.REACT_APP_YOUTUBE_KEY
        }
      }).then((res) => {
        const newVidIds = res.data.items
        const selectedVid = newVidIds[Math.floor(Math.random()*newVidIds.length)];
  
        setVideoId(selectedVid.id.videoId);
      })
    });
  }, []);

  useEffect(() => {
    const getS3Url = async (key) => {
      const url = await Storage.get(key);

      setAudioUrl(url);
    }

    getS3Url("AloneOnEarthA.wav")
  }, []);

  return (
    <div>
      {(videoId && audioUrl) && (
        <div className="full-screen">
            <FullScreenYoutube videoId={videoId}/>
            <BackgroundAudio src={audioUrl}/>
            <FullScreenText content={overlayText}/>

            <NavButton class="nav tl" to="/"/>
        </div>
      )}
    </div>
  )
}

export default YoutubeRobot;