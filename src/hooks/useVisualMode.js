import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  /**
   * Function will take in new mode and update the mode state with the new value
   * @param {string} newMode - new mode value
   * @param {boolean} replace - to set the history to reflect whether or not to replace the current mode
   */
  function transition(newMode, replace = false) {
    if (replace === false) {
      setMode(newMode);
      setHistory((prev) => [...prev, newMode]);
    } else {
      setMode(newMode);
      setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);
    }
  }

  /**
   * Function to transition back to our previous mode
   */
  function back() {
    if (history.length > 1) {
      const newHistory = [...history.slice(0, history.length - 1)];
      setMode(newHistory[newHistory.length - 1]);
      setHistory(newHistory);
    }
  }

  return { mode, transition, back };
}