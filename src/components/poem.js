import React, { useState, useEffect } from 'react';
import '../App.css'

import FullScreenText from '../components/fullScreenText'


function Poem (props) {
  const { content, speechToText} = props
  const [currentLine, setCurrentLine] = useState(0)
  console.log(currentLine);

  
  return (
    <FullScreenText content={content[currentLine]} speechToText={speechToText} callback={setCurrentLine}/>
  )
}

export default Poem;