import React, { useState } from 'react';
import '../App.css'

import FullScreenText from '../components/fullScreenText'


function Poem (props) {
  const { content, speechToText } = props
  const [currentLine, setCurrentLine] = useState(0)

  
  return (
    <FullScreenText content={content[currentLine]} speechToText={speechToText} callback={setCurrentLine}/>
  )
}

export default Poem;