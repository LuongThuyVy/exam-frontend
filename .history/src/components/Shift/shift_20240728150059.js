import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const ExamShiftCard = ({ userId }) => {
  const [examShifts, setExamShifts] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8000/api/exam-shifts');
        console.log('API Response:', response.data); // Log data to check structure
        setExamShifts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleRegister = async (shiftId) => {
    try {
      const response = await axios.post('http://localhost:8000/api/tests', {
        userId,
        shiftId
      });
      console.log('Registration response:', response.data);
    } catch (error) {
      console.error('Error registering for exam:', error.response.data); // Log thêm thông tin lỗi
    }
  };
  

  return (
    <Container>
      <Row>
        {examShifts.map((shift) => (
          <Col key={shift.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>
                  {shift.subjectgrade && shift.subjectgrade.subject && shift.subjectgrade.grade ? (
                    `${shift.subjectgrade.subject.name} - ${shift.subjectgrade.grade.name}`
                  ) : (
                    'Thông tin không đầy đủ'
                  )}
                </Card.Title>
                <Card.Text>
                  {new Date(shift.startTime).toLocaleDateString()}
                </Card.Text>
                <Card.Text>
                  {new Date(shift.startTime).toLocaleTimeString()} - {new Date(shift.endTime).toLocaleTimeString()}
                </Card.Text>
                <Button variant="primary" onClick={() => handleRegister(shift.id)}>Đăng ký thi</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ExamShiftCard;
