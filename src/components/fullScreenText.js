import React, { useEffect } from 'react'
import '../App.css'
import { Predictions } from 'aws-amplify'


function FullScreenText(props) {
  const { content, speechToText, callback} = props
  const { line, text, interval, last } = content

  useEffect(() => {
    const speakLine = async (text) => {
      await Predictions.convert({
        textToSpeech: {
          source: {
            text: text
          },
          voiceId: "Raveena"
        }
      }).then((res) => {
        var audio = new Audio(res.speech.url)
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