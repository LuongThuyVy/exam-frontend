import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Alert, Row, Col, Modal } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import './Shift.css'; 

const ExamShiftCard = () => {
  const [examShifts, setExamShifts] = useState([]);
  const [error, setError] = useState(null);
  const [expandedShiftId, setExpandedShiftId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExamShifts = async () => {
      try {
        // Retrieve user data from local storage
        const userData = localStorage.getItem('user');
        const apiUrl = userData
          ? `http://localhost:8000/api/exam-shifts/user/${JSON.parse(userData).id}`
          : 'http://localhost:8000/api/exam-shifts';

        // Fetch exam shifts using the appropriate endpoint
        const response = await axios.get(apiUrl);
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
        // Redirect to login page if user is not logged in
        navigate('/login');
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
        console.info(message);
        console.info('Created Test:', test);
  
        // Show success modal
        setShowSuccessModal(true);
      } else {
        setError('Unexpected response from sign-in.');
      }
    } catch (signInError) {
      // Log the error and show an appropriate message
      console.error('Sign In Error:', signInError);
      setError(signInError.response ? signInError.response.data.message : 'Something went wrong during sign-in.');
    }
  };

  const toggleDetails = (id) => {
    setExpandedShiftId(expandedShiftId === id ? null : id);
  };

  const handleCloseModal = () => setShowSuccessModal(false);

  return (
    <Container className="mt-4">
      <h1 className="mb-4 text-center">Exam Shifts</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {examShifts.map(shift => (
          <Col md={4} key={shift.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title className='text-center'><strong>{shift.subjectgrade && shift.subjectgrade.subject_grade
                      ? `${shift.subjectgrade.subject_grade.subject.Name} - ${shift.subjectgrade.subject_grade.grade.Name}`
                      : 'Unknown Subject and Grade'}</strong></Card.Title>
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
                      Sign In
                    </Button>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title className="text-success text-center w-100">Registration Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="">Congratulations, you have successfully signed up. Please go to the exam schedule page to view your exam schedule.</p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Link to="/schedule" className="btn btn-primary">
            Go to Schedule
          </Link>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ExamShiftCard;
