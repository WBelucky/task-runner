import React, { useState, useEffect } from 'react';
import './App.css';
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core';

const useStopwatch= () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isPosed, setIsPosed] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [startMs, setStartMs] = useState(0)

  useEffect( () => {
    if (!isRunning) return;

    const tick = () => setElapsedMs(Date.now() - startMs);
    const timerID = setInterval(
      () => tick(), 1000
    )
    return () => clearInterval(timerID)
  }, [isRunning, startMs]);

  return {
    isRunning,
    elapsedMs,
    start: () => {
      setStartMs(Date.now() - (isPosed ? elapsedMs : 0));
      setIsRunning(true);
    },
    stop: () => {
      setIsPosed(true);
      setIsRunning(false);
    },
    reset: () => {
      setIsPosed(false);
      setIsRunning(false);
      setElapsedMs(0);
    }
  } as const;
}


const useCountDown = (remaining: number) => {
  const { isRunning, start, stop, reset, elapsedMs } = useStopwatch();
  const [ initialMs, setInitialMs ] = useState(remaining);
  const [ remainingMs, _setRemainingMs ] = useState(remaining);
  useEffect(() => {
    if ( initialMs - elapsedMs <= 0 ) {
      console.log('complete');
      stop()
      // onCompleteって感じにしたい.
    }
    _setRemainingMs(Math.max(initialMs - elapsedMs, 0))
  }, [elapsedMs])

  const setRemainingMs = (ms: number) => {
    setInitialMs(ms);
    _setRemainingMs(ms);
  }
  return {
    remainingMs,
    isRunning,
    start,
    setRemainingMs,
    reset,
    stop
  } as const;
}

const toString = (ms: number) => {
  const h = Math.floor(ms / 1000 / 60 / 60);
  const m = Math.floor(ms / 1000 / 60 - h * 60);
  const s = Math.ceil(ms / 1000 - m * 60 );
  return `${h > 0 ? h + ' : ' : ''}${('00'+ m).slice(-2)} ' ${('00'+ s).slice(-2)}`;
}

function App() {

  const { isRunning, start, stop, reset, remainingMs } = useCountDown(1000 * 60 * 25);

  return (
    <div className="App">
      <header className="App-header">
        <Typography>{toString(remainingMs)}</Typography>
        <Button onClick={(isRunning ? stop: start) }>
          { isRunning ? "Stop" : "Start" }
        </Button>
        <Button onClick={reset}>
          Reset
        </Button>
      </header>
    </div>
  );
}

export default App;
