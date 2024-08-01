import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Alert, Button, Card, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const Test = () => {
  const [questions, setQuestions] = useState([]);
  const [remainingTime, setRemainingTime] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({}); // To store selected answers
  const location = useLocation(); // To get examId from local storage

  useEffect(() => {
    const examId = localStorage.getItem('examId');
    const duration = localStorage.getItem('duration');
    if (examId && duration) {
      setRemainingTime(parseInt(duration) * 60); // Convert minutes to seconds

      const fetchQuestions = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/exam-questions/${examId}`);
          setQuestions(response.data);
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      };

      fetchQuestions();

      const timer = setInterval(() => {
        setRemainingTime(prevTime => {
          if (prevTime <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: selectedOption
    }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(prev => Math.min(prev + 1, questions.length - 1));
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion(prev => Math.max(prev - 1, 0));
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4 text-center">Test Page</h1>
      {remainingTime > 0 ? (
        <div className="text-center mb-4">
          <h3>Remaining Time: {formatTime(remainingTime)}</h3>
        </div>
      ) : (
        <Alert variant="warning">Time is up!</Alert>
      )}
      {questions.length > 0 ? (
        <Card>
          <Card.Body>
            <h3>Question {currentQuestion + 1}</h3>
            <p>{questions[currentQuestion].question_answer.Content}</p>
            <Form>
              <Form.Check
                type="radio"
                id={`optionA-${questions[currentQuestion].Id}`}
                label={questions[currentQuestion].question_answer.OptionA}
                name={`question-${questions[currentQuestion].Id}`}
                value="A"
                checked={answers[questions[currentQuestion].Id] === 'A'}
                onChange={() => handleOptionChange(questions[currentQuestion].Id, 'A')}
              />
              <Form.Check
                type="radio"
                id={`optionB-${questions[currentQuestion].Id}`}
                label={questions[currentQuestion].question_answer.OptionB}
                name={`question-${questions[currentQuestion].Id}`}
                value="B"
                checked={answers[questions[currentQuestion].Id] === 'B'}
                onChange={() => handleOptionChange(questions[currentQuestion].Id, 'B')}
              />
              <Form.Check
                type="radio"
                id={`optionC-${questions[currentQuestion].Id}`}
                label={questions[currentQuestion].question_answer.OptionC}
                name={`question-${questions[currentQuestion].Id}`}
                value="C"
                checked={answers[questions[currentQuestion].Id] === 'C'}
                onChange={() => handleOptionChange(questions[currentQuestion].Id, 'C')}
              />
              <Form.Check
                type="radio"
                id={`optionD-${questions[currentQuestion].Id}`}
                label={questions[currentQuestion].question_answer.OptionD}
                name={`question-${questions[currentQuestion].Id}`}
                value="D"
                checked={answers[questions[currentQuestion].Id] === 'D'}
                onChange={() => handleOptionChange(questions[currentQuestion].Id, 'D')}
              />
            </Form>
          </Card.Body>
          <Card.Footer>
            <Button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              className="me-2"
            >
              Previous
            </Button>
            <Button
              onClick={handleNextQuestion}
              disabled={currentQuestion >= questions.length - 1}
            >
              Next
            </Button>
          </Card.Footer>
        </Card>
      ) : (
        <Alert variant="info">Loading questions...</Alert>
      )}
    </Container>
  );
};

export default Test;
