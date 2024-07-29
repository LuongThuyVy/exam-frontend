import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ExamShiftCard = () => {
  const [examShifts, setExamShifts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const fetchExamShifts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/exam-shifts');
        setExamShifts(response.data);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Something went wrong');
        setExamShifts([]);
      }
    };

    fetchExamShifts();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/exam-shift/${id}`); // Use navigate for routing
  };

  const handleSignIn = (id) => {
    // Implement sign-in logic or redirect to a sign-in page
    console.log(`Sign in for exam shift with ID: ${id}`);
    navigate(`/sign-in/${id}`); // Use navigate for routing
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Exam Shifts</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {examShifts.map(shift => (
          <Col md={4} key={shift.id} className="mb-4">
            <Card>
              <Card.Header>{shift.subjectgrade ? shift.subjectgrade.Name : 'Unknown Subject'}</Card.Header>
              <Card.Body>
                <Card.Title>Grade: {shift.subjectgrade ? shift.subjectgrade.grade.Name : 'Unknown Grade'}</Card.Title>
                <Card.Text>
                  <strong>Date:</strong> {new Date(shift.startTime).toLocaleDateString()}<br />
                  <strong>Time:</strong> {new Date(shift.startTime).toLocaleTimeString()} - {new Date(shift.endTime).toLocaleTimeString()}
                </Card.Text>
                <Button variant="primary" onClick={() => handleViewDetails(shift.id)}>View Details</Button>
              </Card.Body>
              <Card.Footer>
                <Button variant="secondary" onClick={() => handleSignIn(shift.id)}>Sign In</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ExamShiftCard;
