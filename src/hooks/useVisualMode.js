import { useState, useEffect } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace) {
    setMode(() => {
      return mode;
    });

    setHistory((prev) => {
      const current = [...prev];

      if (replace) {
        current.pop();
      }

      current.push(mode);

      console.log(history, mode);

      return current;
    });
  }

  function back() {
    if (history.length > 1) {
      setHistory((prev) => {
        const current = [...prev];
        current.pop();

        console.log(history);

        return current;
      });

      setMode(() => {
        return history[history.length - 2];
      });
    }
  }

  return { mode, transition, back };
}