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
const phrase = 'people on the water'
const maxResults = 10
const locationRadius = '20mi'
const audioFile = 'AloneOnEarth.wav'
const delay = 7000

const poem = [
  {'line': 0, 'text': 'I swim underneath,', 'interval': 1700},
  {'line': 1, 'text': 'where the brightness comes from,', 'interval': 2200},
  {'line': 2, 'text': 'now I am in half', 'interval': 1800},
  {'line': 3, 'text': 'now I wear the world', 'interval': 1700},
  {'line': 4, 'text': 'like a wound on my mouth.', 'interval': 1800},
  {'line': 5, 'text': 'for so long I wanted to hold things', 'interval': 2400},
  {'line': 6, 'text': 'like the sky', 'interval': 1200},
  {'line': 7, 'text': 'to have brightness and flying', 'interval': 1800},
  {'line': 8, 'text': 'in my breath', 'interval': 1400},
  {'line': 9, 'text': 'but that is not me,', 'interval': 1400},
  {'line': 10, 'text': 'I was stolen', 'interval': 1400},
  {'line': 11, 'text': 'or I am close to dying', 'interval': 1400},
  {'line': 12, 'text': 'or', 'interval': 1000},
  {'line': 13, 'text': 'I am sick', 'interval': 1200},
  {'line': 14, 'text': 'and I will die of this sickness', 'interval': 2100},
  {'line': 15, 'text': 'I will never recover', 'interval': 1800},
  {'line': 16, 'text': 'I die of the same thing', 'interval': 1900},
  {'line': 17, 'text': 'over, and over', 'interval': 1300},
  {'line': 18, 'text': 'because this is a great system', 'interval': 2200},
  {'line': 19, 'text': 'now we know ourselves', 'interval': 2000},
  {'line': 20, 'text': 'we can fight to the death', 'interval': 2000},
  {'line': 21, 'text': 'our names are precious', 'interval': 1800},
  {'line': 22, 'text': 'and we have many names', 'interval': 1700},
  {'line': 23, 'text': 'in all the great books', 'interval': 1700},
  {'line': 24, 'text': 'and we kiss the books', 'interval': 1700},
  {'line': 25, 'text': 'with our deathly mouths', 'interval': 2000},
  {'line': 26, 'text': 'our judgment', 'interval': 1000},
  {'line': 27, 'text': '- like love -', 'interval': 1000},
  {'line': 28, 'text': 'was born from civilizations', 'interval': 2000},
  {'line': 29, 'text': 'so far away and long dead', 'interval': 2000},
  {'line': 30, 'text': 'just air, just a kiss', 'interval': 2000},
  {'line': 31, 'text': 'for our poor mouths', 'interval': 2000},
  {'line': 32, 'text': 'I love you', 'interval': 1000},
  {'line': 33, 'text': 'I love you', 'interval': 1000},
  {'line': 34, 'text': 'I love you', 'interval': 1500},
  {'line': 35, 'text': 'I am sorry', 'interval': 1400},
  {'line': 36, 'text': 'because no one', 'interval': 1400},
  {'line': 37, 'text': 'has ever known what to say', 'interval': 1800},
  {'line': 38, 'text': 'because this is a dark river', 'interval': 2000},
  {'line': 39, 'text': 'and no one else', 'interval': 1400},
  {'line': 40, 'text': 'will ever be here', 'interval': 1500, 'last': true}
]


function AloneOnEarth() {
  const [videoId, setVideoId] = useState()
  const [audioUrl, setAudioUrl] = useState()
  const [ready, setReady] = useState()
  
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
        setVideoId(selectedVid.id.videoId)
      })
    });
  }, []);


  useEffect(() => {
    const getS3Url = async (key) => {
      const url = await Storage.get(key);
      setAudioUrl(url);
    }

    getS3Url(audioFile)
  }, []);


  useEffect(() => {
    setTimeout(() => {
      setReady(true)
    }, delay)
  }, []);


  return (
    <div>
      {(videoId && audioUrl) && (
      <div>
        <FullScreenVid>
          <VidFromYoutube videoId={videoId}/>
          <BackgroundAudio src={audioUrl}/>
          <NavButton class="nav tl" to="/"/>
          {ready && (
            <Poem content={poem} speechToText={true}/>
          )}
        </FullScreenVid>
      </div>
      )}
    </div>
  )
}


export default AloneOnEarth;