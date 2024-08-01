import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Alert, Button, Row, Col, Card, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const WaitingRoom = () => {
  const [examShifts, setExamShifts] = useState([]);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [selectedExamShift, setSelectedExamShift] = useState(null); // Store selected exam shift
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExamShifts = async () => {
      try {
        const userData = localStorage.getItem('user');
        if (!userData) {
          throw new Error('User data not found');
        }

        const user = JSON.parse(userData);
        const accountId = user.id;

        // Fetch exam shifts
        const response = await axios.get(`http://localhost:8000/api/exam-schedule/${accountId}`);
        const shifts = response.data;

        setExamShifts(shifts);

        // Set warning if there are exactly two exam shifts
        if (shifts.length === 2) {
          setWarning('You can only choose one exam shift to test. Please choose wisely!');
        } else {
          setWarning(null);
        }

        setError(null);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Something went wrong');
        setExamShifts([]);
      }
    };

    fetchExamShifts();
  }, []);

  const handleStartTest = (examShift) => {
    setSelectedExamShift(examShift); // Store selected exam shift
    setShowWarningModal(true);
  };

  const handleConfirmStart = () => {
    if (selectedExamShift) {
      const examId = selectedExamShift.examShift.id;
      const duration = selectedExamShift.examShift.subjectgrade ? selectedExamShift.examShift.subjectgrade.Duration : 'Unknown Duration';

      localStorage.setItem('examShiftId', examId);
      localStorage.setItem('duration', duration);

      // Redirect to the test page
      navigate(`/test`);
    }
    setShowWarningModal(false);
  };

  const handleCancelStart = () => {
    setShowWarningModal(false);
  };

  const renderMessage = () => {
    if (examShifts.length === 1) {
      return "Your exam has started. Start now!";
    } else if (examShifts.length > 1) {
      return "All your exams have started. Start testing now!";
    }
    return "";
  };

  const calculateRemainingTime = (endTime) => {
    const currentTime = new Date();
    const end = new Date(endTime);
    const timeDifference = end - currentTime;

    if (timeDifference <= 0) return null; // Exam shift already ended

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  const renderEndingSoonMessage = (endTime) => {
    const remainingTime = calculateRemainingTime(endTime);
    if (remainingTime) {
      return ` Exam shift is ending in ${remainingTime}.`;
    }
    return '';
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4 text-center">Waiting Room</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {examShifts.length > 0 && (
        <div>
          <Alert variant="info" className="text-center mb-3">
            <p>{renderMessage()}</p>
          </Alert>
          {warning && (
            <div className="text-danger mb-3">
              <FaExclamationTriangle className="text-danger me-2" />
              {warning}
            </div>
          )}
        </div>
      )}
      <Row className="justify-content-center">
        {examShifts.map(shift => (
          <Col md={4} key={shift.examShift.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title className='text-center'>
                  <strong>
                    {shift.examShift.subjectgrade && shift.examShift.subjectgrade.subject_grade
                      ? `${shift.examShift.subjectgrade.subject_grade.subject.Name} - ${shift.examShift.subjectgrade.subject_grade.grade.Name}`
                      : 'Unknown Subject and Grade'}
                  </strong>
                </Card.Title>
                <div className="exam-shift-details">
                  <div>
                    <strong>Exam shift:</strong> {shift.examShift.name}
                  </div>
                  <p><strong>Description:</strong> {shift.examShift.subjectgrade ? shift.examShift.subjectgrade.Description : 'No Description'}</p>
                  <div>
                    <strong>Date:</strong> {shift.examShift.startTime ? new Date(shift.examShift.startTime).toLocaleDateString() : 'Unknown Date'}
                  </div>
                  <div>
                    <strong>Time:</strong> {shift.examShift.startTime ? new Date(shift.examShift.startTime).toLocaleTimeString() : 'Unknown Time'} - {shift.examShift.endTime ? new Date(shift.examShift.endTime).toLocaleTimeString() : 'Unknown Time'}
                  </div>
                  <p><strong>Duration:</strong> {shift.examShift.subjectgrade ? shift.examShift.subjectgrade.Duration + ' minutes' : 'No Duration'}</p>
                  <p><strong>Total Questions:</strong> {shift.examShift.subjectgrade ? shift.examShift.subjectgrade.TotalQuestions : 'No Total Questions'}</p>
                  {shift.examShift.endTime && (
                    <p className="text-danger">
                      <b>
                        <FaExclamationTriangle className="text-danger me-2" />
                        {renderEndingSoonMessage(shift.examShift.endTime)}
                      </b>
                    </p>
                  )}
                </div>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="info"
                  onClick={() => handleStartTest(shift)}
                  className="w-100 mt-2"
                >
                  Start Test
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showWarningModal} onHide={handleCancelStart} centered>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'><b>Confirm Start Test</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to start the test now?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCancelStart}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmStart}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default WaitingRoom;
