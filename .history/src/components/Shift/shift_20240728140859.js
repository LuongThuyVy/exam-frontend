import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const ExamShiftCard = () => {
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

  return (
    <Container>
      <Row>
        {examShifts.map((shift) => {
          const exam = exams.find(exam => exam.Id === shift.ExamId);
          const subjectGrade = exam?.subjectGrade;
          const subjectName = subjectGrade?.subject?.Name;
          const gradeName = subjectGrade?.grade?.Name;

          return (
            <Col key={shift.id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{subjectName} - {gradeName}</Card.Title>
                  <Card.Text>
                    {new Date(shift.StartTime).toLocaleDateString()}
                  </Card.Text>
                  <Card.Text>
                    {new Date(shift.StartTime).toLocaleTimeString()} - {new Date(shift.EndTime).toLocaleTimeString()}
                  </Card.Text>
                  <Button variant="primary">Đăng ký thi</Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default ExamShiftCard;
