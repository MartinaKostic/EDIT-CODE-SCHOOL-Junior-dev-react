import { useEffect, useState } from "react";
import { decode } from "html-entities";
import { BsCheck2 } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

function Question(props) {
  const [answers, setAnswers] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [choosenAnswer, setChoosenAnswer] = useState(false);

  function handleClick(answer) {
    setChoosenAnswer(answer);
    setDisabled(true);
    if (answer == props.correct) {
      setCorrect(true);
      props.addPoints();
    } else {
    }
  }
  function getAnswers(el) {
    let answers = [...el.incorrect_answers];
    answers.splice(
      Math.floor(Math.random() * (el.incorrect_answers.length + 1)),
      0,
      el.correct_answer
    );
    return answers;
  }
  useEffect(() => {
    setAnswers(getAnswers(props.el));
  }, []);

  return (
    <div>
      <p>
        {props.index}.{props.question}
      </p>
      <div>
        {answers &&
          answers.map((el) => {
            return (
              <div>
                <button
                  onClick={() => handleClick(decode(el))}
                  disabled={disabled}
                >
                  <div>{decode(el)}</div>
                </button>
                {disabled && decode(el) == props.correct && correct ? (
                  <span style={{ position: "absolute", paddingTop: "7px" }}>
                    <BsCheck2 />
                  </span>
                ) : null}
                {disabled && decode(el) == choosenAnswer && !correct ? (
                  <span style={{ position: "absolute", paddingTop: "7px" }}>
                    <RxCross2 />
                  </span>
                ) : null}
              </div>
            );
          })}
      </div>
    </div>
  );
}
export default Question;
/* 
style={
  disabled && decode(el) == props.correct
    ? { background: "green" }
    : null
} */
