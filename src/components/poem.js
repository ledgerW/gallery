import React, { useState } from 'react';
import '../App.css'

import FullScreenText from '../components/fullScreenText'


function Poem (props) {
  const { content, speechToText, voice } = props
  const [currentLine, setCurrentLine] = useState(0)

  
  return (
    <FullScreenText
      content={content[currentLine]}
      speechToText={speechToText}
      voice={voice}
      callback={setCurrentLine}/>
  )
}

export default Poem;