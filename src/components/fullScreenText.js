import React, { useEffect } from 'react'
import '../App.css'
import { Predictions } from 'aws-amplify'


function FullScreenText(props) {
  const { content, speechToText, voice, callback } = props
  const { line, text, interval, last } = content

  useEffect(() => {
    const speakLine = async (text) => {
      await Predictions.convert({
        textToSpeech: {
          source: {
            text: text
          },
          voiceId: voice
        }
      }).then((res) => {
        var audio = new Audio(res.speech.url)
        audio.volume = 0.8
        audio.play()
        //var voice = new Pizzicato.Sound(res.speech.url)
        //voice.play()

        if (!last) {
          setTimeout(() => {
            callback(line+1)
          }, interval)
        }
      })
    }

    if (speechToText) {
      speakLine(text)
    }
  })
  
  return (
    <p>{text}</p>
  )
}

export default FullScreenText;