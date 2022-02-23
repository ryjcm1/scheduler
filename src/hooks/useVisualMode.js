import React, {useState} from "react";

export function useVisualMode(initial){
  const [mode, setMode] = useState({current: initial, previous: null})

  const transition = (newMode) => {
    const previous = mode.current;
    setMode({current:newMode, previous: previous})
  }

  const back = () => {
    const current = mode.previous;
    setMode({current:current, previous:null})
  }

  return {
    mode,
    transition,
    back
  }
 

}


//result.current.mode = INITAL