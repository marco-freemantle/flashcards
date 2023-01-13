import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  italianDictImp,
  practiceDictImp,
  coloursDictImp,
  numbersDictImp,
} from "./dictionaries";
import { useState, useEffect } from "react";
import Flipper from "./Components/Flipper";
import { initializeApp } from "firebase/app";
import * as utilities from "./Utilities/FirestoreUtilities";

const firebaseConfig = {
  apiKey: "AIzaSyBtORfRYLXs3sC1tMviIhUYjM90AfhpgM8",
  authDomain: "flashcard-79794.firebaseapp.com",
  projectId: "flashcard-79794",
  storageBucket: "flashcard-79794.appspot.com",
  messagingSenderId: "704397522677",
  appId: "1:704397522677:web:1b2be225c467ff0c5df7bc",
  measurementId: "G-B6FBZE6C7E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  //Score counters
  const [incorrect, setIncorrect] = useState(0);
  const [correct, setCorrect] = useState(0);
  //All previous questions
  const [prevNums, setPrevNums] = useState([]);
  //Current dict in use
  const [currentDict, setCurrentDict] = useState(italianDictImp);
  //Current question and answers
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  //Some more states
  const [generalDict, setGeneralDict] = useState(italianDictImp);
  const [coloursDict, setColoursDict] = useState(coloursDictImp);
  const [numbersDict, setNumbersDict] = useState(numbersDictImp);
  const [practiceDict, setPracticeDict] = useState(practiceDictImp);

  useEffect(() => {
    getRandom();
  }, [currentDict]);

  utilities.getAllDict().then((data) => {
    setGeneralDict(data);
  });
  utilities.getColoursDict().then((data) => {
    setColoursDict(data);
  });
  utilities.getNumbersDict().then((data) => {
    setNumbersDict(data);
  });
  utilities.getPracticeDict().then((data) => {
    setPracticeDict(data);
  });

  function getRandom(val) {
    let num = Math.floor(Math.random() * (Object.keys(currentDict).length - 0));

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
            changeDict(generalDict);
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
