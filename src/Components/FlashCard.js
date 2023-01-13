import { useState } from "react";
import "./FlashCard.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function FlashCard(props) {
  const [userAnswer, setUserAnswer] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);

  function submitAnswer(event) {
    event.preventDefault();
    setHasAnswered(true);
  }

  function loadNext() {
    props.getNewCard();
    document.getElementById("answer-form").reset();
    setHasAnswered(false);
  }

  let answerSection;

  if (hasAnswered) {
    answerSection = <p>{props.answer}</p>;
  }

  return (
    <div className="flashcard-box">
      <div className="flashcard-flex">
        <p className="question">{props.question}</p>
        <div>{answerSection}</div>
        <Form onSubmit={submitAnswer} id="answer-form" className="form">
          <div className="form-flex">
            <Form.Control
              type="text"
              placeholder="Enter your answer"
              onChange={(e) => setUserAnswer(e.target.value)}
              className="answerInputbox"
            />

            <Button variant="primary" type="submit" className="submit-button">
              Submit
            </Button>
          </div>
          <Button variant="primary" onClick={loadNext}>
            Next
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default FlashCard;
