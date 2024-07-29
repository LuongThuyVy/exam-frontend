import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const ExamShiftList = () => {
  const [examShifts, setExamShifts] = useState([]);
  const [exams, setExams] = useState([]);
  const [grades, setGrades] = useState([]); // Assuming you have grades data

  useEffect(() => {
    async function fetchData() {
      try {
        const [shiftsResponse, examsResponse, gradesResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/exam-shifts'),
          axios.get('http://localhost:8000/api/exams'),
          axios.get('http://localhost:8000/api/grades') // Fetch grades
        ]);

        setExamShifts(shiftsResponse.data);
        setExams(examsResponse.data);
        setGrades(gradesResponse.data); // Save grades data
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
        {examShifts.map((shift) => {
          // Find exam and grade details
          const exam = exams.find(exam => exam.Id === shift.ExamId);
          const grade = grades.find(grade => grade.Id === exam?.GradeId);

          return (
            <Col md={4} key={shift.Id} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>
                    {exam?.Name || 'Unknown'} - {grade?.Name || 'Unknown'}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {new Date(shift.StartTime).toLocaleDateString()}
                  </Card.Subtitle>
                  <Card.Text>
                    {new Date(shift.StartTime).toLocaleTimeString()} - {new Date(shift.EndTime).toLocaleTimeString()}
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
          );
        })}
      </Row>
    </Container>
  );
};

export default ExamShiftList;
