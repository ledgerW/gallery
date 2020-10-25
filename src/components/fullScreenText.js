import React, { useState, useEffect } from 'react';
import '../App.css'
import { Predictions } from 'aws-amplify'


function FullScreenText(props) {
  const { content, speechToText, callback} = props
  const { line, text, interval, last } = content
  console.log('from FullScreenText: ' + line)

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