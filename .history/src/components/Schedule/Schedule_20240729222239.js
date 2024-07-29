import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spinner } from 'react-bootstrap';
import moment from 'moment';

const ExamScheduleCard = ({ accountId }) => {
  const [examShifts, setExamShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchExamShifts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/schedule/${accountId}`);
        setExamShifts(response.data);
      } catch (err) {
        console.error('Error fetching exam shifts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchExamShifts();
  }, [accountId]);
  

  const formatTimeRemaining = (startTime) => {
    const now = moment();
    const start = moment(startTime);
    const duration = moment.duration(start.diff(now));

    const hours = duration.hours();
    const minutes = duration.minutes();

    if (hours <= 1) {
      return (
        <span style={{ color: 'red' }}>
          in {hours} hour{hours !== 1 ? 's' : ''}
        </span>
      );
    }
    return (
      <span style={{ color: 'green' }}>
        in {hours} hour{hours !== 1 ? 's' : ''}, {minutes} minute{minutes !== 1 ? 's' : ''}
      </span>
    );
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mt-4">
      {examShifts.map((shift) => (
        <Card key={shift.testId} className="mb-3">
          <Card.Body>
            <Card.Title>{shift.examShift.subjectgrade.Name} - Lớp {shift.examShift.subjectgrade.grade.Name}</Card.Title>
            <Card.Text>Exam shift: {shift.examShift.name}</Card.Text>
            <Card.Text>Date: {moment(shift.examShift.startTime).format('MM/DD/YYYY')}</Card.Text>
            <Card.Text>
              Time: {moment(shift.examShift.startTime).format('h:mm:ss A')} - {moment(shift.examShift.endTime).format('h:mm:ss A')}
            </Card.Text>
            <Card.Text>
              Time Remaining: {formatTimeRemaining(shift.examShift.startTime)}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default ExamScheduleCard;
