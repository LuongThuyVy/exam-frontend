import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import moment from 'moment'; // Import moment for date handling

const Schedule = () => {
  const [examShifts, setExamShifts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExamShifts = async () => {
      try {
        // Retrieve user data from local storage
        const userData = localStorage.getItem('user');
        if (!userData) {
          throw new Error('User data not found');
        }

        // Parse user data
        const user = JSON.parse(userData);
        const accountId = user.id; // Ensure this matches your stored key

        // Fetch exam shifts using the updated endpoint
        const response = await axios.get(`http://localhost:8000/api/schedule/${accountId}`);
        setExamShifts(response.data);
        setError(null); // Clear any previous errors
      } catch (err) {
        // Log detailed error
        if (err.response) {
          console.error('Error Response:', {
            status: err.response.status,
            data: err.response.data,
            headers: err.response.headers,
          });
          setError(`Error ${err.response.status}: ${err.response.data.message || 'Something went wrong'}`);
        } else {
          console.error('Error Message:', err.message);
          setError('Something went wrong while fetching exam shifts.');
        }
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

      // Prepare the payload
      const payload = {
        ExamineeId: examineeId,
        ExamShiftId: id
      };
    
      // Perform the sign-in request
      const signInResponse = await axios.post('http://localhost:8000/api/tests', payload);
      if (signInResponse.status === 201) {
        // Handle successful response
        const { message, test } = signInResponse.data;
        console.info('Success Message:', message);
        console.info('Created Test:', test);
  
        // Redirect or update state if needed
        // Example: navigate to another page or update a state
      } else {
        setError('Unexpected response from sign-in.');
      }
    } catch (signInError) {
      // Log detailed error
      if (signInError.response) {
        console.error('Error Response:', {
          status: signInError.response.status,
          data: signInError.response.data,
          headers: signInError.response.headers,
        });
        setError(`Error ${signInError.response.status}: ${signInError.response.data.message || 'Something went wrong during sign-in.'}`);
      } else {
        console.error('Error Message:', signInError.message);
        setError('Something went wrong during sign-in.');
      }
    }
  };

  const getRemainingTime = (date) => {
    const now = moment();
    const examDate = moment(date);
    return examDate.isSame(now, 'day') ? 'Today' : examDate.fromNow();
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4 text-center">Exam Schedule</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {examShifts.map(shift => (
          <Col md={4} key={shift.id} className="mb-4"> {/* Ensure unique key here */}
            <Card>
              <Card.Body>
                <Card.Title className='text-center'>
                  <strong>
                    {shift.subjectgrade && shift.subjectgrade.subject_grade
                      ? `${shift.subjectgrade.subject_grade.subject.Name} - ${shift.subjectgrade.subject_grade.grade.Name}`
                      : 'Unknown Subject and Grade'}
                  </strong>
                </Card.Title>
                <div className="exam-shift-details">
                  <div>
                    <strong>Exam shift:</strong> {shift.name}
                  </div>
                  <div>
                    <strong>Date:</strong> {shift.startTime ? new Date(shift.startTime).toLocaleDateString() : 'Unknown Date'}
                  </div>
                  <div>
                    <strong>Time:</strong> {shift.startTime ? new Date(shift.startTime).toLocaleTimeString() : 'Unknown Time'} - {shift.endTime ? new Date(shift.endTime).toLocaleTimeString() : 'Unknown Time'}
                  </div>
                  <div>
                    <strong>Time Remaining:</strong> {getRemainingTime(shift.startTime)}
                  </div>
                </div>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="info"
                  onClick={() => handleSignIn(shift.id)}
                  className="w-100"
                  disabled={!moment(shift.startTime).isSame(moment(), 'day')}
                >
                  {moment(shift.startTime).isSame(moment(), 'day') ? 'Take Exam' : 'Not Available'}
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Schedule;
