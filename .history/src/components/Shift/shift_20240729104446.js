import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ExamShiftCard = () => {
  const [examShifts, setExamShifts] = useState([]);
  const [error, setError] = useState(null);
  const [expandedShiftId, setExpandedShiftId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExamShifts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/exam-shifts');
        setExamShifts(response.data);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Something went wrong');
        console.error('Fetch Exam Shifts Error:', err); // Log detailed error
        setExamShifts([]);
      }
    };

    fetchExamShifts();
  }, []);

  const handleSignIn = async (id) => {
    try {
      // Retrieve user data from local storage
      const userData = localStorage.getItem('user');
  
      if (!userData) {
        console.error('User data not found in local storage.');
        setError('User data not found. Please log in again.');
        return;
      }
  
      // Parse user data
      const user = JSON.parse(userData);
      const examineeId = user.id; // Ensure this matches your stored key
  
      if (!examineeId) {
        console.error('Examinee ID not found in user data.');
        setError('Examinee ID is missing. Please log in again.');
        return;
      }
  
      // Perform the sign-in request
      const response = await axios.post('http://localhost:8000/tests', {
        ExamineeId: examineeId,
        ExamShiftId: id
      });
  
      console.log(`Sign in successful for exam shift with ID: ${id}`);
      navigate(`/some-page`); // Redirect after successful sign-in
    } catch (err) {
      // Log the error and show an appropriate message
      console.error('Sign In Error:', err);
      setError(err.response ? err.response.data.message : 'Something went wrong during sign-in.');
    }
  };
  

  const toggleDetails = (id) => {
    setExpandedShiftId(expandedShiftId === id ? null : id);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Exam Shifts</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {examShifts.map(shift => (
          <Col md={4} key={shift.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{shift.name}</Card.Title>
                <div>
                  <strong>{shift.subjectgrade && shift.subjectgrade.subject_grade
                    ? `${shift.subjectgrade.subject_grade.subject.Name} - ${shift.subjectgrade.subject_grade.grade.Name}`
                    : 'Unknown Subject and Grade'}</strong>
                </div>
                <div>
                  <strong>Date:</strong> {shift.startTime ? new Date(shift.startTime).toLocaleDateString() : 'Unknown Date'}
                </div>
                <div>
                  <strong>Time:</strong> {shift.startTime ? new Date(shift.startTime).toLocaleTimeString() : 'Unknown Time'} - {shift.endTime ? new Date(shift.endTime).toLocaleTimeString() : 'Unknown Time'}
                </div>
                {expandedShiftId === shift.id && (
                  <div className="mt-3">
                    <p><strong>Description:</strong> {shift.subjectgrade.Description}</p>
                    <p><strong>Duration:</strong> {shift.subjectgrade.Duration} minutes</p>
                    <p><strong>Total Questions:</strong> {shift.subjectgrade.TotalQuestions}</p>
                  </div>
                )}
              </Card.Body>
              <Card.Footer>
                <Row>
                  <Col>
                    <Button
                      variant="outline-info"
                      onClick={() => toggleDetails(shift.id)}
                      className="w-100"
                    >
                      {expandedShiftId === shift.id ? 'Hide Details' : 'Show Details'}
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="info"
                      onClick={() => handleSignIn(shift.id)}
                      className="w-100"
                    >
                      Sign In
                    </Button>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ExamShiftCard;
