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
        const userData = localStorage.getItem('user');
        if (!userData) {
          throw new Error('User data not found');
        }

        const user = JSON.parse(userData);
        const accountId = user.id;

        const response = await axios.get(`http://localhost:8000/api/exam-shifts/user/${accountId}`);
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

  const handleSignIn = async (id) => {
    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        console.error('User data not found in local storage.');
        setError('User data not found. Please log in again.');
        return;
      }

      const user = JSON.parse(userData);
      const examineeId = user.id;

      if (!examineeId) {
        console.error('Examinee ID not found in user data.');
        setError('Examinee ID is missing. Please log in again.');
        return;
      }

      const payload = {
        ExamineeId: examineeId,
        ExamShiftId: id
      };

      const signInResponse = await axios.post('http://localhost:8000/api/tests', payload);
      if (signInResponse.status === 201) {
        console.info('Test Created Successfully:', signInResponse.data);
        navigate('/schedule'); // Redirect to the schedule page
      } else {
        setError('Unexpected response from sign-in.');
      }
    } catch (signInError) {
      console.error('Sign In Error:', signInError);
      setError(signInError.response ? signInError.response.data.message : 'Something went wrong during sign-in.');
    }
  };

  const toggleDetails = (id) => {
    setExpandedShiftId(expandedShiftId === id ? null : id);
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4 text-center">Exam Shifts</h1>
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
                  {expandedShiftId === shift.id && (
                    <div className="exam-shift-expanded-details mt-3">
                      <p><strong>Description:</strong> {shift.subjectgrade ? shift.subjectgrade.Description : 'No Description'}</p>
                      <p><strong>Duration:</strong> {shift.subjectgrade ? shift.subjectgrade.Duration + ' minutes' : 'No Duration'}</p>
                      <p><strong>Total Questions:</strong> {shift.subjectgrade ? shift.subjectgrade.TotalQuestions : 'No Total Questions'}</p>
                    </div>
                  )}
                </div>
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
                      Start Test
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
