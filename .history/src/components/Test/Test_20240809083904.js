import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Container, Alert, Button, Card, Form, Modal } from 'react-bootstrap';
import './Test.css';
import { useNavigate } from 'react-router-dom';

const Test = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [remainingTime, setRemainingTime] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [completionTime, setCompletionTime] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [timerId, setTimerId] = useState(null);

useEffect(() => {
  const examShiftId = localStorage.getItem('examShiftId');
  const duration = localStorage.getItem('duration');

  if (examShiftId && duration) {
    const totalTime = parseInt(duration, 10) * 60;
    setRemainingTime(totalTime);

    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/exam-questions/${examShiftId}`);
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
          confirmSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 100o);

    setTimerId(timer);
    
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

  const handleSubmit = () => {
    setShowConfirmModal(true);
  };

  const confirmSubmit = useCallback(async () => {
    try {
      if (timerId) {
        clearInterval(timerId);
      }
      const examShiftId = localStorage.getItem('examShiftId');
      const testId = localStorage.getItem('testId');
      const duration = localStorage.getItem('duration');
      const totalDuration = parseInt(duration, 10) * 60; // Total duration in seconds
      const formattedAnswers = Object.keys(answers).map(questionId => ({
        QuestionAnswerId: questionId,
        SelectedOption: answers[questionId]
      }));
      
      const completionTime = totalDuration - remainingTime; // Calculate completion time
      localStorage.setItem('completionTime', completionTime);
      
      const dataToSend = {
        TestId: testId,
        answers: formattedAnswers,
        time: completionTime
      };
  
      const response = await axios.post('http://localhost:8000/api/tests/submit', dataToSend);
  
      setShowSuccessModal(true); // Show success modal
      
    } catch (error) {
      console.error('Error submitting answers:', error);
      alert('There was an error submitting your answers. Please try again.');
    }
  }, [timerId, answers, remainingTime]);
  

  const handleQuestionClick = (questionIndex) => {
    setCurrentQuestion(questionIndex);
  };

  const renderQuestionStatus = () => {
    const totalQuestions = questions.length;
    const numColumns = 5; // Number of columns in the table

    const rows = [];
    for (let i = 0; i < totalQuestions; i += numColumns) {
      const columns = [];
      for (let j = 0; j < numColumns; j++) {
        const questionIndex = i + j;
        if (questionIndex >= totalQuestions) break;

        const question = questions[questionIndex];
        const isAnswered = answers[question.question_answer.Id] !== undefined;
        const cellClass = isAnswered ? 'bg-success' : 'bg-danger';
        const isCurrent = questionIndex === currentQuestion;
        const currentQuestionClass = isCurrent ? 'current-question' : '';

        columns.push(
          <td
            key={j}
            className={`p-2 text-center ${cellClass} ${currentQuestionClass}`}
            onClick={() => handleQuestionClick(questionIndex)}
          >
            {questionIndex + 1}
          </td>
        );
      }
      rows.push(<tr key={i}>{columns}</tr>);
    }

    return (
      <table className="table table-bordered table-striped question-status-table">
        <tbody>{rows}</tbody>
      </table>
    );
  };
  
  
  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between">
        <div className="flex-grow-1">
          <h1 className="mb-4 text-center">Test Page</h1>
          {questions.length > 0 ? (
            <Card>
              <Card.Body>
                <h3>Question {currentQuestion + 1}</h3>
                <p>{questions[currentQuestion].question_answer.Content}</p>
                <Form>
  {questions[currentQuestion].question_answer.OptionA && (
    <Form.Check
      type="radio"
      id={`optionA-${questions[currentQuestion].question_answer.Id}`}
      label={questions[currentQuestion].question_answer.OptionA}
      name={`question-${questions[currentQuestion].question_answer.Id}`}
      value="A"
      checked={answers[questions[currentQuestion].question_answer.Id] === 'A'}
      onChange={remainingTime > 0 ? () => handleOptionChange(questions[currentQuestion].question_answer.Id, 'A') : undefined}
      disabled={remainingTime <= 0}
    />
  )}
  {questions[currentQuestion].question_answer.OptionB && (
    <Form.Check
      type="radio"
      id={`optionB-${questions[currentQuestion].question_answer.Id}`}
      label={questions[currentQuestion].question_answer.OptionB}
      name={`question-${questions[currentQuestion].question_answer.Id}`}
      value="B"
      checked={answers[questions[currentQuestion].question_answer.Id] === 'B'}
      onChange={remainingTime > 0 ? () => handleOptionChange(questions[currentQuestion].question_answer.Id, 'B') : undefined}
      disabled={remainingTime <= 0}
    />
  )}
  {questions[currentQuestion].question_answer.OptionC && (
    <Form.Check
      type="radio"
      id={`optionC-${questions[currentQuestion].question_answer.Id}`}
      label={questions[currentQuestion].question_answer.OptionC}
      name={`question-${questions[currentQuestion].question_answer.Id}`}
      value="C"
      checked={answers[questions[currentQuestion].question_answer.Id] === 'C'}
      onChange={remainingTime > 0 ? () => handleOptionChange(questions[currentQuestion].question_answer.Id, 'C') : undefined}
      disabled={remainingTime <= 0}
    />
  )}
  {questions[currentQuestion].question_answer.OptionD && (
    <Form.Check
      type="radio"
      id={`optionD-${questions[currentQuestion].question_answer.Id}`}
      label={questions[currentQuestion].question_answer.OptionD}
      name={`question-${questions[currentQuestion].question_answer.Id}`}
      value="D"
      checked={answers[questions[currentQuestion].question_answer.Id] === 'D'}
      onChange={remainingTime > 0 ? () => handleOptionChange(questions[currentQuestion].question_answer.Id, 'D') : undefined}
      disabled={remainingTime <= 0}
    />
  )}
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
                {currentQuestion === questions.length - 1 ? (
                  <Button onClick={handleSubmit} className="me-2">
                    Submit
                  </Button>
                ) : (
                  <Button onClick={handleNextQuestion} disabled={currentQuestion >= questions.length - 1}>
                    Next
                  </Button>
                )}
              </Card.Footer>
            </Card>
          ) : (
            <Alert variant="info">Loading questions...</Alert>
          )}
        </div>
        <div className="question-status-container">
          <div className="remaining-time text-center">
            {remainingTime > 0 ? (
              <div className="text-center mb-4">
                <div>Remaining Time:</div>
                <h5> {formatTime(remainingTime)}</h5>
              </div>
            ) : (
              <Alert variant="warning">Time is up!</Alert>
            )}
          </div>
          {renderQuestionStatus()}
        </div>
      </div>
{/* Success Modal */}
<Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title className="text-success text-center w-100">Submission Successful</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>Your answers have been submitted successfully!</p>
  </Modal.Body>
  <Modal.Footer className="justify-content-center">
    <Button variant="primary" onClick={() => {
      setShowSuccessModal(false);
      navigate(`/test/${localStorage.getItem('testId')}`); // Navigate to the test page
    }}>
      OK
    </Button>
  </Modal.Footer>
</Modal>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to submit your answers?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              confirmSubmit(); // Calculate and submit completion time
              setShowConfirmModal(false);
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Test;


  
