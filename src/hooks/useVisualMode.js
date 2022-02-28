import { useState } from "react";

export default function useVisualMode (initial){
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  function transition (newMode, replace = false) {

    setMode(newMode)
    
    if(replace){
      let historyCopy = [...history];
      historyCopy.pop();
      return setHistory([...historyCopy, newMode])
    }

    return setHistory(prev => [...prev, newMode])
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