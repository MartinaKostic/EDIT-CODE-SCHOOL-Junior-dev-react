import { useState, useEffect } from "react";

function Timer(props) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);

  useEffect(() => {
    let intervalid = 0;
    if (isRunning) {
      intervalid = setInterval(() => setTime(time + 1), 10);
      props.action3(minutes, seconds);
    }
    props.action2(isRunning);

    return () => clearInterval(intervalid);
  }, [isRunning, time]);

  //pokreni zaustavi
  const startStop = () => {
    setIsRunning(!isRunning);
  };

  //reset
  const reset = () => {
    setTime(0);
    props.action3(0, 0);
    props.action1();
  };

  return (
    <div>
      <p>
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </p>
      <button onClick={startStop}>
        {isRunning ? "Stop the game" : "Start the game"}
      </button>
      <button onClick={reset}>Reset the Game</button>
    </div>
  );
}

export default Timer;
