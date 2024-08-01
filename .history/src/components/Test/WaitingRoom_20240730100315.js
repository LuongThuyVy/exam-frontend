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

  const handleStartTest = (examShiftId) => {
    setShowWarningModal(true);
    // Set up logic to handle starting the test here
  };

  const handleConfirmStart = () => {
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
               
