import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Alert, Button, Row, Col, Card, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TestPage = () => {
  const [examShifts, setExamShifts] = useState([]);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);
  const [showWarningModal, setShowWarningModal] = useState(false);
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

        // Set warning message if there are exactly two exam shifts
        if (shifts.length === 2) {
          setWarning('You can only choose one exam shift to test.');
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

  const handleStartTest = (examShiftId) => {
    setShowWarningModal(true);
    // Set up logic to handle starting the test here
  };

  const handleConfirmStart = (examShiftId) => {
    navigate(`/test`);
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

  const isEndingSoon = (endTime) => {
    const currentTime = new Date();
    const end = new Date(endTime);
    const timeDifference = end - currentTime;
    // Check if the exam shift ends within the next 30 minutes
    return timeDifference > 0 && timeDifference <= 30 * 60 * 1000;
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4 text-center">Waiting Room</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {examShifts.length > 0 && (
        <Alert variant="info" className="text-center">
          <p>{renderMessage()}</p>
          {warning && (
            <Alert variant="danger" className="d-flex align-items-center">
              <i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>
              {warning}
            </Alert>
          )}
        </Alert>
      )}
      <Row>
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
                  <div>
                    <strong>Date:</strong> {shift.examShift.startTime ? new Date(shift.examShift.startTime).toLocaleDateString() : 'Unknown Date'}
                  </div>
                  <div>
                    <strong>Time:</strong> {shift.examShift.startTime ? new Date(shift.examShift.startTime).toLocaleTimeString() : 'Unknown Time'} - {shift.examShift.endTime ? new Date(shift.examShift.endTime).toLocaleTimeString() : 'Unknown Time'}
                  </div>
                </div>
              </Card.Body>
              <Card.Footer>
                {shift.examShift.endTime && isEndingSoon(shift.examShift.endTime) && (
                  <Alert variant="danger" className="text-center">
                    <i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>
                    Exam shift is ending soon!
                  </Alert>
                )}
                <Button
                  variant="primary"
                  onClick={() => handleStartTest(shift.examShift.id)}
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
          <Modal.Title>Confirm Start Test</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to start the test now?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelStart}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleConfirmStart()}>
            Start Test
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TestPage;
