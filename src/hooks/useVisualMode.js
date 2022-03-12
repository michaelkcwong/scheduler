import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([]);

  function transition(newMode, replace = false) {
    if (replace === false) {
      history.push(mode);
    }
    setMode(newMode);
  }

  return { mode, transition };
}