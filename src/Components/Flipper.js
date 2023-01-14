import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import "./Flipper.css";
import Button from "react-bootstrap/Button";

function Flipper(props) {
  const [isFlipped, setIsFlipped] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  }

  function incorrect() {
    setIsFlipped(false);
    props.getNewCard("incorrect");
  }

  function correct() {
    setIsFlipped(false);
    props.getNewCard("correct");
  }

  function moveToAll() {
    props.moveToAll();
  }

  function moveToPractice() {
    props.moveToPractice();
  }

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <div className="flashcard-front">
        <p className="flashcard-text">{props.question}</p>

        <div className="buttons-container">
          <Button variant="danger" onClick={incorrect} className="flipButton">
            Incorrect
          </Button>
          <Button
            variant="primary"
            onClick={handleClick}
            className="flipButton"
          >
            Flip
          </Button>

          <Button variant="success" onClick={correct} className="flipButton">
            Correct
          </Button>
        </div>
        <div className="buttons-container">
          <Button
            variant="warning"
            onClick={moveToAll}
            className="switchbutton"
          >
            Move to All
          </Button>
          <Button
            variant="warning"
            onClick={moveToPractice}
            className="switchbutton"
          >
            Move to Practice
          </Button>
        </div>
      </div>

      <div className="flashcard-front">
        <p className="flashcard-text">{props.answer}</p>
        <div className="buttons-container">
          <Button variant="danger" onClick={incorrect} className="flipButton">
            Incorrect
          </Button>
          <Button
            variant="primary"
            onClick={handleClick}
            className="flipButton"
          >
            Flip
          </Button>

          <Button variant="success" onClick={correct} className="flipButton">
            Correct
          </Button>
        </div>
        <div className="buttons-container">
          <Button
            variant="warning"
            onClick={moveToAll}
            className="switchbutton"
          >
            Move to All
          </Button>
          <Button
            variant="warning"
            onClick={moveToPractice}
            className="switchbutton"
          >
            Move to Practice
          </Button>
        </div>
      </div>
    </ReactCardFlip>
  );
}

export default Flipper;
