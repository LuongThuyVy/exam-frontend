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
        // Retrieve user data from local storage
        const userData = localStorage.getItem('user');
        if (!userData) {
          setError('User data not found. Please log in again.');
          return;
        }
        
        // Parse user data
        const user = JSON.parse(userData);
        const accountId = user.id; // Ensure this matches your stored key
        
        // Fetch exam shifts for the user
        const response = await axios.get(`http://localhost:8000/api/exam-shifts/user/${accountId}`);
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

      // Log the examineeId and examShiftId
      console.debug('Examinee ID from local storage:', examineeId);
      console.debug('Exam Shift ID passed to function:', id);

      if (!examineeId) {
        console.error('Examinee ID not found in user data.');
        setError('Examinee ID is missing. Please log in again.');
        return;
      }

      // Prepare the payload
      const payload = {
        ExamineeId: examineeId,
        ExamShiftId: id
      };
      
      // Log the JSON payload being sent
      console.log('Sending payload:', JSON.stringify(payload));
      
      // Perform the sign-in request
      const signInResponse = await axios.post(`http://localhost:8000/api/tests`, payload);
      console.debug('Sign-in response:', signInResponse);

      if (signInResponse.status === 201) {
        console.info('Sign-in successful, response:', signInResponse.data);

        // Handle successful response
        const { message, test } = signInResponse.data;
        console.info(message);
        console.info('Created Test:', test);

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate('/login'); // Adjust the path as needed
        }, 2000);
      } else {
        console.warn('Unexpected response status from sign-in:', signInResponse.status);
        setError('Unexpected response from sign-in.');
      }
    } catch (signInError) {
      // Log the error and show an appropriate message
      console.error('Sign In Error:', signInError);
      if (signInError.response) {
        console.error('Response data:', signInError.response.data);
        console.error('Response status:', signInError.response.status);
        console.error('Response headers:', signInError.response.headers);
        setError(signInError.response.data.message || 'Something went wrong during sign-in.');
      } else {
        setError('Something went wrong during sign-in.');
      }
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
  