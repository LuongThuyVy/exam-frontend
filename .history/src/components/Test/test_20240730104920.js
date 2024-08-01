import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Alert, Button, Card, Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const TestPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [duration, setDuration] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [timer, setTimer] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    const fetchExamData = async () => {
      const { state } = location;
      const { examId, examDuration } = state || {};

      if (!examId || !examDuration) {
        navigate('/');
        return;
      }

      setDuration(examDuration);
      setRemainingTime(examDuration);

      try {
        const response = await axios.get(`http://localhost:8000/api/exam-questions/${examId}`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchExamData();
  }, [location, navigate]);

  useEffect(() => {
    if (remainingTime > 0) {
      setTimer(setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000));
    } else {
      clearInterval(timer);
      // Handle timer end logic here
    }

    return () => clearInterval(timer);
  }, [remainingTime]);

  const handleSubmit = () => {
    setShowSubmitModal(true);
  };

  const handleConfirmSubmit = () => {
    // Handle submission logic here
    setShowSubmitModal(false);
    navigate('/');
  };

  const handleCancelSubmit = () => {
    setShowSubmitModal(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4 text-center">Test Page</h1>
      <Alert variant="info" className="text-center mb-3">
        <p>Time Remaining: {formatTime(remainingTime)}</p>
      </Alert>
      {questions.length === 0 ? (
        <Alert variant="info">Loading questions...</Alert>
      ) : (
        questions.map(question => (
          <Card key={question.Id} className="mb-4">
            <Card.Body>
              <Card.Title>
                <strong>Question {question.Sequence}</strong>
              </Card.Title>
              <Card.Text>
                {question.question_answer.Content}
              </Card.Text>
              <div>
                <strong>Options:</strong>
                <ul>
                  <li>{question.question_answer.OptionA}</li>
                  <li>{question.question_answer.OptionB}</li>
                  <li>{question.question_answer.OptionC}</li>
                  <li>{question.question_answer.OptionD}</li>
                </ul>
              </div>
            </Card.Body>
          </Card>
        ))
      )}
      <Button variant="primary" onClick={handleSubmit} className="w-100 mt-2">
        Submit Test
      </Button>

      <Modal show={showSubmitModal} onHide={handleCancelSubmit} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to submit the test now?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelSubmit}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TestPage;
