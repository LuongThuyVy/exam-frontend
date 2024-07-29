import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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

        // Fetch exam shifts using the endpoint with the user ID
        const response = await axios.get(`http://localhost:8000/api/schedule/${accountId}`);
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
          <Col md={4} key={shift.id} className="mb-4">
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
