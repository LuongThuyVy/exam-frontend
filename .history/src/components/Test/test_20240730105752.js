import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Alert, Button, Card, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const Test = () => {
  const [questions, setQuestions] = useState([]);
  const [remainingTime, setRemainingTime] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const location = useLocation();

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
            <p>{questions[currentQuestion].question}</p>
            {/* Render options */}
            <Form>
              {/* Options rendering */}
            </Form>
          </Card.Body>
          <Card.Footer>
            <Button
              onClick={() => setCurrentQuestion(prev => prev + 1)}
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
