import React, {useState} from "react";

export default function useVisualMode (initial){
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  function transition (newMode) {
    setMode(newMode)
    setHistory([...history, newMode])
  }

  function back(){
    
    let historyCopy = [...history];
    historyCopy.pop();
    setHistory(historyCopy)
    setMode(historyCopy[historyCopy.length - 1])
  }

  return {
    mode,
    transition,
    back
  }
 

}


//result.current.mode = INITAL