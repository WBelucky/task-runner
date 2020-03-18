import React, { useState, useEffect } from 'react';
import './App.css';
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core';

const useTimer: () => [boolean, React.Dispatch<React.SetStateAction<boolean>>, number] = () => {
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);

  const tick = (start: number) => setElapsedMs(new Date().getTime() - start);
  useEffect( () => {
    if (!timerRunning) return;
    const start = new Date().getTime();
    const timerID = setInterval(
      () => tick(start), 1000
    )
    return () => clearInterval(timerID)
  }, [timerRunning]);
  return [timerRunning, setTimerRunning, elapsedMs];
}

const useCountDown = () => {
  
}

function App() {
  const [timerRunning, setTimerRunning, elapsedMs] = useTimer();
  return (
    <div className="App">
      <header className="App-header">
        <Typography>{Math.floor(elapsedMs / 1000)}</Typography>
        <Button onClick={ () => setTimerRunning(!timerRunning)}>
          { timerRunning ? "Stop" : "Start"}
        </Button>
      </header>
    </div>
  );
}

export default App;
