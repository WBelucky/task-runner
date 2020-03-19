import React, { useState, useEffect } from 'react';
import './App.css';
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core';

const useTimer = () => {
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [startMs, setStartMs] = useState(0)
  const [isPosed, setIsPosed] = useState(false);

  const startTimer = () => {
    setStartMs(Date.now() - (isPosed ? elapsedMs : 0));
    setTimerRunning(true);
  }
  const stopTimer = () => {
    setIsPosed(true);
    setTimerRunning(false);
  }
  const resetTimer = () => {
    setIsPosed(false);
    setTimerRunning(false);
    setElapsedMs(0);
  }

  useEffect( () => {
    if (!timerRunning) return;

    const tick = () => setElapsedMs(Date.now() - startMs);
    const timerID = setInterval(
      () => tick(), 1000
    )
    return () => clearInterval(timerID)
  }, [timerRunning]);

  return {
    timerRunning,
    startTimer,
    stopTimer,
    resetTimer,
    elapsedMs
  } as const;
}

function App() {
  // const [timerRunning, setTimerRunning, elapsedMs] = useTimer();
  const { timerRunning, startTimer, stopTimer, resetTimer, elapsedMs } = useTimer();

  return (
    <div className="App">
      <header className="App-header">
        <Typography>{Math.floor(elapsedMs / 1000)}</Typography>
        <Button onClick={ () => (timerRunning ? stopTimer() : startTimer()) }>
          { timerRunning ? "Stop" : "Start"}
        </Button>
        <Button onClick={ () => resetTimer() }>
          Reset
        </Button>
      </header>
    </div>
  );
}

export default App;
