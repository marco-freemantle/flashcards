import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  italianDict,
  practiceDict,
  coloursDict,
  numbersDict,
} from "./dictionaries";
import { useState, useEffect } from "react";
import Flipper from "./Components/Flipper";

function App() {
  const [incorrect, setIncorrect] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [prevNums, setPrevNums] = useState([]);
  const [currentDict, setCurrentDict] = useState(italianDict);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    getRandom();
  }, [currentDict]);

  function getRandom(val) {
    let num = Math.floor(Math.random() * (Object.keys(currentDict).length - 0));
    console.log(Object.keys(currentDict).length);
    console.log(num);

    while (prevNums.includes(num)) {
      num = Math.floor(Math.random() * (Object.keys(currentDict).length - 0));
      if (prevNums.length >= Object.keys(currentDict).length) {
        setPrevNums([]);
        break;
      }
    }

    setPrevNums([...prevNums, num]);

    setQuestion(Object.entries(currentDict)[num][0]);
    setAnswer(Object.entries(currentDict)[num][1]);

    if (val === undefined) return;
    if (val === "incorrect") {
      setIncorrect(incorrect + 1);
    }
    if (val === "correct") {
      setCorrect(correct + 1);
    }
  }

  function changeDict(dict) {
    setCurrentDict(dict);
    setPrevNums([]);
  }

  return (
    <div className="App">
      <div className="card-selection">
        <button
          className="card-selection-button"
          onClick={() => {
            changeDict(numbersDict);
          }}
        >
          Numbers
        </button>
        <button
          className="card-selection-button"
          onClick={() => {
            changeDict(coloursDict);
          }}
        >
          Colours
        </button>
        <button
          className="card-selection-button"
          onClick={() => {
            changeDict(italianDict);
          }}
        >
          All
        </button>
        <button
          className="card-selection-button"
          onClick={() => {
            changeDict(practiceDict);
          }}
        >
          Practice
        </button>
      </div>

      <div>
        <div className="title-and-trackers">
          <p className="tracker-wrong">{incorrect}</p>
          <h1 className="title">Flashcards</h1>
          <p className="tracker-right">{correct}</p>
        </div>

        <Flipper question={question} answer={answer} getNewCard={getRandom} />
      </div>
    </div>
  );
}

export default App;
