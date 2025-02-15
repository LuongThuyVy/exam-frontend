import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Alert, Row, Col, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ExamShiftCard = () => {
  const [examShifts, setExamShifts] = useState([]);
  const [error, setError] = useState(null);
  const [expandedShiftId, setExpandedShiftId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedShiftId, setSelectedShiftId] = useState(null);
  const [modalMessage, setModalMessage] = useState('');
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

        console.log(`Fetching exam shifts for account ID: ${accountId}`);

        // Fetch exam shifts
        const response = await axios.get(`http://localhost:8000/api/exam-schedule/${accountId}`);
        console.log('Exam Shifts Response:', response.data);

        setExamShifts(response.data);
        setError(null);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Something went wrong');
        console.error('Fetch Exam Shifts Error:', err);
        setExamShifts([]);
      }
    };

    fetchExamShifts();
  }, []);

  const toggleDetails = (id) => {
    setExpandedShiftId(expandedShiftId === id ? null : id);
  };

  const handleStartTest = async (shiftId) => {
    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        throw new Error('User data not found');
      }

      const user = JSON.parse(userData);
      const accountId = user.id;

      setSelectedShiftId(shiftId);
      setShowConfirmModal(true);

      // Check if test can be started
      const response = await axios.post(`http://localhost:8000/api/start-test`, {
        accountId,
        examShiftId: shiftId
      });

      if (response.data.message === 'Test started successfully') {
        // Redirect to test page
        navigate('/test');
      } else {
        setModalMessage(response.data.message || 'Test cannot be started.');
      }
    } catch (err) {
      console.error('Start Test Error:', err);
      setModalMessage('Error starting the test.');
    }
  };

  const confirmStartTest = () => {
    if (selectedShiftId) {
      handleStartTest(selectedShiftId);
    }
  };

  const handleCloseModal = () => setShowConfirmModal(false);

  return (
    <Container className="mt-4">
      <h1 className="mb-4 text-center">Waiting Room</h1>
      <h2></h2>
      {error && <Alert variant="danger">{error}</Alert>}
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
                  {expandedShiftId === shift.examShift.id && (
                    <div className="exam-shift-expanded-details mt-3">
                      <p><strong>Description:</strong> {shift.examShift.subjectgrade ? shift.examShift.subjectgrade.Description : 'No Description'}</p>
                      <p><strong>Duration:</strong> {shift.examShift.subjectgrade ? shift.examShift.subjectgrade.Duration + ' minutes' : 'No Duration'}</p>
                      <p><strong>Total Questions:</strong> {shift.examShift.subjectgrade ? shift.examShift.subjectgrade.TotalQuestions : 'No Total Questions'}</p>
                    </div>
                  )}
                </div>
              </Card.Body>
              <Card.Footer>
                <Row>
                  <Col>
                    <Button
                      variant="outline-info"
                      onClick={() => toggleDetails(shift.examShift.id)}
                      className="w-100"
                    >
                      {expandedShiftId === shift.examShift.id ? 'Hide Details' : 'Show Details'}
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="outline-success"
                      onClick={() => handleStartTest(shift.examShift.id)}
                      className="w-100"
                    >
                      Start Test
                    </Button>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Start Test</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to start the test?</p>
          {modalMessage && <Alert variant="info">{modalMessage}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmStartTest}>
            Yes, Start Test
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ExamShiftCard;
