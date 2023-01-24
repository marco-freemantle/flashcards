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
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NoteList from "./Components/Notes/NoteList";

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
initializeApp(firebaseConfig);

function App() {
  //Score counters
  const [incorrect, setIncorrect] = useState(0);
  const [correct, setCorrect] = useState(0);
  //All previous questions
  const [prevNums, setPrevNums] = useState([]);
  //Current dict in use
  const [currentDict, setCurrentDict] = useState(italianDictImp);
  const [dictName, setDictName] = useState("All");
  //Current question and answers
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  //Some more states
  const [generalDict, setGeneralDict] = useState(italianDictImp);
  const [coloursDict, setColoursDict] = useState(coloursDictImp);
  const [numbersDict, setNumbersDict] = useState(numbersDictImp);
  const [practiceDict, setPracticeDict] = useState(practiceDictImp);

  //State for adding new card
  const [englishTerm, setEnglishTerm] = useState("");
  const [italianTerm, setItalianTerm] = useState("");

  useEffect(() => {
    getRandom();
    // eslint-disable-next-line
  }, [currentDict]);

  useEffect(() => {
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
  }, []);

  function getRandom(val) {
    let num = Math.floor(Math.random() * (Object.keys(currentDict).length - 0));

    console.log(prevNums);

    while (prevNums.includes(num)) {
      if (prevNums.length === Object.keys(currentDict).length) break;
      num = Math.floor(Math.random() * (Object.keys(currentDict).length - 0));
    }

    setPrevNums([...prevNums, num]);

    if (prevNums.length >= Object.keys(currentDict).length) {
      setPrevNums([]);
    }

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

  function moveToAll() {
    if (dictName === "Practice") {
      if (generalDict[question] === undefined) {
        //Remove question from practice
        let practiceCopy = practiceDict;
        delete practiceCopy[question];
        setPracticeDict(practiceCopy);
        //Add question to general
        let generalCopy = generalDict;
        generalCopy[question] = answer;
        setGeneralDict(generalCopy);
      } else {
        let practiceCopy = practiceDict;
        delete practiceCopy[question];
        setPracticeDict(practiceCopy);
      }
      //Update firestore here
      utilities.updateAllDicts(practiceDict, generalDict);
    }
  }

  function moveToPractice() {
    if (dictName !== "Practice") {
      if (practiceDict[question] === undefined) {
        let practiceCopy = practiceDict;
        practiceCopy[question] = answer;
        setPracticeDict(practiceCopy);
      }
      //Update firestore here
      utilities.updateAllDicts(practiceDict, generalDict);
    }
  }

  function addNewCard(event) {
    event.preventDefault();
    //Add card to all and practice
    let practiceCopy = practiceDict;
    practiceCopy[englishTerm] = italianTerm;
    setPracticeDict(practiceCopy);

    let generalCopy = generalDict;
    generalCopy[englishTerm] = italianTerm;
    setGeneralDict(generalCopy);

    //Update firestore here
    utilities.updateAllDicts(practiceDict, generalDict).then(() => {
      document.getElementById("newCardForm").reset();
      setEnglishTerm("");
      setItalianTerm("");
    });
  }

  return (
    <div className="App">
      <div className="card-selection">
        <button
          className="card-selection-button"
          onClick={() => {
            changeDict(numbersDict);
            setDictName("Numbers");
          }}
        >
          Numbers
        </button>
        <button
          className="card-selection-button"
          onClick={() => {
            changeDict(coloursDict);
            setDictName("Colours");
          }}
        >
          Colours
        </button>
        <button
          className="card-selection-button"
          onClick={() => {
            changeDict(generalDict);
            setDictName("All");
          }}
        >
          All
        </button>
        <button
          className="card-selection-button"
          onClick={() => {
            changeDict(practiceDict);
            setDictName("Practice");
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

        <Flipper
          question={question}
          answer={answer}
          getNewCard={getRandom}
          moveToAll={moveToAll}
          moveToPractice={moveToPractice}
        />

        <Form onSubmit={addNewCard} id="newCardForm" className="newCardForm">
          <Form.Control
            type="text"
            placeholder="Enter English term"
            onChange={(e) => setEnglishTerm(e.target.value)}
            min={1}
          />
          <Form.Control
            type="text"
            placeholder="Enter Italian translation"
            onChange={(e) => setItalianTerm(e.target.value)}
            min={1}
          />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <NoteList />
      </div>
    </div>
  );
}

export default App;
