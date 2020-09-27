import React, { useState, useEffect } from 'react';
import '../App.css'
import FullScreenYoutube from '../components/fullScreenYoutube'
import NavButton from '../components/navButton'
import Youtube from '../apis/youtube';


function YoutubeRobot(props) {
  const [videoId, setVideoId] = useState()
  const [isSearching, setSearching] = useState(true)

  const phrase = "funny";
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const location = (position.coords.latitude + "," + position.coords.longitude);
      console.log(location);

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
        console.log(res);
        const newVidIds = res.data.items
        const selectedVid = newVidIds[Math.floor(Math.random()*newVidIds.length)];
        console.log(selectedVid.id.videoId);
  
        setVideoId(selectedVid.id.videoId);
        setSearching(false);
      })
    });
  }, []);

  return (
    <div>
      {!isSearching && (
        <div>
            <FullScreenYoutube videoId={videoId}/>

            <NavButton class="nav tl" to="/"/>
        </div>
      )}
    </div>
  )
}

export default YoutubeRobot;