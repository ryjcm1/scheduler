import React, {useState} from "react";

export default function useVisualMode (initial){
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  function transition (newMode, replace = false) {
    if(replace){
      let historyCopy = [...history];
      historyCopy.pop();
      setHistory([...historyCopy, newMode])
      return setMode(newMode)
    }

    setMode(newMode)
    setHistory([...history, newMode])
  }

  function back(){

    if(history.length > 1){
      let historyCopy = [...history];
      historyCopy.pop();
      setHistory(historyCopy)
      setMode(historyCopy[historyCopy.length - 1])
    }


  }

  return {
    mode,
    transition,
    back
  }
 

}


//result.current.mode = INITAL