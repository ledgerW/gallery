import React, { useState, useEffect } from 'react';
import '../App.css'
import { Storage } from 'aws-amplify'
import VidFromYoutube from '../components/vidFromYoutube'
import Poem from '../components/poem'
import BackgroundAudio from '../components/backgroundAudio'
import NavButton from '../components/navButton'
import Youtube from '../apis/youtube'
import FullScreenVid from '../components/fullScreenVid'


// Artistic Content Parameters
const phrase = 'swimming alone'
const maxResults = 10
const locationRadius = '20mi'

const poem = [
  {'line': 0, 'text': 'I swim underneath,', 'interval': 2000},
  {'line': 1, 'text': 'where the brightness comes from,', 'interval': 2500},
  {'line': 2, 'text': 'now I am in half', 'interval': 2000},
  {'line': 3, 'text': 'now I wear the world like a wound', 'interval': 2000},
  {'line': 4, 'text': 'on my mouth. for so long', 'interval': 2500},
  {'line': 5, 'text': 'I wanted to hold things like the sky', 'interval': 2500},
  {'line': 6, 'text': 'to have brightness and flying', 'interval': 1900},
  {'line': 7, 'text': 'in my breath', 'interval': 1200},
  {'line': 8, 'text': 'but that', 'interval': 900},
  {'line': 9, 'text': 'is not me, I was stolen', 'interval': 2000},
  {'line': 10, 'text': 'or I am close to dying', 'interval': 2000},
  {'line': 11, 'text': 'or', 'interval': 2000},
  {'line': 12, 'text': 'I am sick', 'interval': 1500},
  {'line': 13, 'text': 'and I will die of this sickness', 'interval': 2500},
  {'line': 14, 'text': 'I will never recover', 'interval': 2000},
  {'line': 15, 'text': 'I die of the same thing', 'interval': 2000},
  {'line': 16, 'text': 'over and over', 'interval': 1500},
  {'line': 17, 'text': 'because this is a great system', 'interval': 2500},
  {'line': 18, 'text': 'now we know ourselves', 'interval': 2500},
  {'line': 19, 'text': 'we can fight to the death', 'interval': 2500},
  {'line': 20, 'text': 'our names are precious', 'interval': 2500},
  {'line': 21, 'text': 'and we have many names', 'interval': 2500},
  {'line': 22, 'text': 'in all the great books', 'interval': 2500},
  {'line': 23, 'text': 'and we kiss the books', 'interval': 2500},
  {'line': 24, 'text': 'with our deathly mouths', 'interval': 2000},
  {'line': 25, 'text': 'our judgment', 'interval': 1500},
  {'line': 26, 'text': '- like love -', 'interval': 1500},
  {'line': 27, 'text': 'was born', 'interval': 1000},
  {'line': 28, 'text': 'from civilizations', 'interval': 1000},
  {'line': 29, 'text': 'so far away and long dead', 'interval': 2000},
  {'line': 30, 'text': 'just air, just a kiss', 'interval': 2000},
  {'line': 31, 'text': 'for our poor mouths', 'interval': 2000},
  {'line': 32, 'text': 'I love you', 'interval': 1000},
  {'line': 33, 'text': 'I love you', 'interval': 1000},
  {'line': 34, 'text': 'I love you', 'interval': 1000},
  {'line': 35, 'text': 'I am sorry because', 'interval': 2000},
  {'line': 36, 'text': 'no one has ever', 'interval': 2000},
  {'line': 37, 'text': 'known what to say', 'interval': 2000},
  {'line': 38, 'text': 'because this', 'interval': 2000},
  {'line': 39, 'text': 'is a dark river', 'interval': 2000},
  {'line': 40, 'text': 'and no one else', 'interval': 2000},
  {'line': 41, 'text': 'will ever be here', 'interval': 2000, 'last': true}
]


function AloneOnEarth() {
  const [videoId, setVideoId] = useState()
  const [audioUrl, setAudioUrl] = useState()
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const location = (position.coords.latitude + "," + position.coords.longitude);

      Youtube.get('/search', {
        params: {
          part: 'snippet',
          maxResults: maxResults,
          locationRadius: locationRadius,
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
      <div>
        <FullScreenVid>
          <VidFromYoutube videoId={videoId}/>
          {/*<BackgroundAudio src={audioUrl}/>*/}
          <NavButton class="nav tl" to="/"/>
          <Poem content={poem} speechToText={true}/>
        </FullScreenVid>
      </div>
      )}
    </div>
  )
}


export default AloneOnEarth;