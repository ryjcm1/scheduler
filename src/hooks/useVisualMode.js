import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //sets a new mode, and replaces the last mode in history when
  //mode is used to replace and error
  function transition(newMode, replace = false) {
    setMode(newMode);

    if (replace) {
      return setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);
    }

    return setHistory((prev) => [...prev, newMode]);
  }

  //used when the user presses cancel
  //reverts the mode to the previous mode in history
  function back() {
    if (history.length > 1) {
      let historyCopy = [...history];
      historyCopy.pop();
      setHistory(historyCopy);
      setMode(historyCopy[historyCopy.length - 1]);
    }
  }

  return {
    mode,
    transition,
    back,
  };
}
