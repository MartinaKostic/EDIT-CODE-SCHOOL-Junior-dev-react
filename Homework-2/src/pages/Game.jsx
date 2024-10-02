import { useState, useEffect } from "react";
import Button from "../components/Button";
import logocb from "../../public/cb.png";
import logop from "../../public/phili.png";
import Timer from "../components/Timer";

function Game() {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const [resultCB, setResultCB] = useState(0);
  const [resultP, setResultP] = useState(0);
  const [flag, setFlag] = useState(false);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [tracker, setTracker] = useState([]);

  const scoredCB = (score) => {
    setResultCB((res) => res + score);
  };
  const scoredP = (score) => {
    setResultP((res) => res + score);
  };
  const resetScore = () => {
    setResultCB(0);
    setResultP(0);
    setTracker([]);
  };
  const startGame = (f) => {
    setFlag(f);
  };
  const tracking = (m, s) => {
    setMin(m);
    setSec(s);
  };
  useEffect(() => {
    const Tracking = {
      score: resultCB.toString().concat(":").concat(resultP.toString()),
      time: min.toString().concat("min").concat(sec.toString()).concat("s"),
    };
    if (sec || min) {
      setTracker((arr) => [...arr, Tracking]);
    }
  }, [resultCB, resultP]);

  return (
    <div>
      <h2>{date}</h2>
      <h2>Basketball Game</h2>
      <div className="logos">
        <div>
          <img className="logo" src={logocb} alt="cb" />
          <h2>Chicago Bulls</h2>
        </div>
        <h2 className="result">
          {resultCB}:{resultP}
        </h2>
        <div>
          <img className="logo" src={logop} alt="p" />
          <h2>Philadelphia 76ers</h2>
        </div>
      </div>

      <Timer
        action1={resetScore}
        action2={startGame}
        action3={tracking}
      ></Timer>
      <div className="row">
        <div className="buttons">
          <Button task="Free throw" action={() => scoredCB(1)} flag={flag} />
          <Button task="Two pointer" action={() => scoredCB(2)} flag={flag} />
          <Button task="Three pointer" action={() => scoredCB(3)} flag={flag} />
        </div>
        <div className="buttons">
          <Button task="Free throw" action={() => scoredP(1)} flag={flag} />
          <Button task="Two pointer" action={() => scoredP(2)} flag={flag} />
          <Button task="Three pointer" action={() => scoredP(3)} flag={flag} />
        </div>
      </div>
      <div>
        <h3>Current results:</h3>
        {tracker.map((obj) => (
          <div>
            {obj.score} {obj.time}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Game;
