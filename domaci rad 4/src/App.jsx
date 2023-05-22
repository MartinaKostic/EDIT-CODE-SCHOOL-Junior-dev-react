import { useState } from "react";
import "./App.css";
import Question from "./Components/Question";
import axios from "axios";
import { decode } from "html-entities";
import { RxFontSize } from "react-icons/rx";

function App() {
  const [results, setResults] = useState(null);
  const [points, setPoints] = useState(0);

  const countPoints = () => {
    setPoints((p) => p + 1);
  };

  function getQuestions() {
    setPoints(0);
    axios
      .get(
        "https://opentdb.com/api.php?amount=5&category=12&difficulty=easy&type=multiple"
      )
      .then((res) => setResults(res.data.results))
      .catch((err) => alert(err));
  }

  return (
    <div className="App">
      <h1> Music quiz</h1>
      <button style={{ width: "500px" }} onClick={getQuestions}>
        Start the game!
      </button>
      <div>
        {results &&
          results.map((el, index) => (
            <div>
              <Question
                index={index + 1}
                key={el.question}
                question={decode(el.question)}
                correct={el.correct_answer}
                el={el}
                addPoints={countPoints}
              ></Question>
            </div>
          ))}
      </div>
      {results && <h2>Achived points:{points}/5</h2>}
    </div>
  );
}

export default App;
