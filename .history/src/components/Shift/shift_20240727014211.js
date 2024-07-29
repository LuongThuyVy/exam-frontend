import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const ExamShiftList = () => {
  const [examShifts, setExamShifts] = useState([]);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [shiftsResponse, examsResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/exam-shifts'),
          axios.get('http://localhost:8000/api/exams')
        ]);

        setExamShifts(shiftsResponse.data);
        setExams(examsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleRegister = (shiftId) => {
    // Implement registration logic here
    alert(`Registering for shift ID: ${shiftId}`);
  };

  return (
    <Container>
      <Row>
        {examShifts.map((shift) => (
          <Col md={4} key={shift.Id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{shift.Name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {new Date(shift.StartTime).toLocaleString()} - {new Date(shift.EndTime).toLocaleString()}
                </Card.Subtitle>
                <Card.Text>
                  Exam: {exams.find(exam => exam.Id === shift.ExamId)?.Name || 'Unknown'}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleRegister(shift.Id)}
                  className="position-absolute bottom-0 end-0 m-2"
                >
                  Đăng ký thi
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ExamShiftList;
