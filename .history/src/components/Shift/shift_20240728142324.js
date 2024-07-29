import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const ExamShiftCard = () => {
  const [examShifts, setExamShifts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8000/api/exam-shifts');
        setExamShifts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <Container>
      <Row>
        {examShifts.map((shift) => (
          <Col key={shift.  id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{shift.subject} - {shift.grade}</Card.Title>
                <Card.Text>
                  {new Date(shift.startTime).toLocaleDateString()}
                </Card.Text>
                <Card.Text>
                  {new Date(shift.startTime).toLocaleTimeString()} - {new Date(shift.endTime).toLocaleTimeString()}
                </Card.Text>
                <Button variant="primary">Đăng ký thi</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ExamShiftCard;
