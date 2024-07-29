import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ExamShiftCard = ({ examShifts }) => {
  const getTimeRemaining = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const difference = end - now;

    if (difference < 0) return 'Exam has ended';

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    return `in ${hours} hours and ${minutes} minutes`;
  };

  return (
    <div>
      {examShifts.map((shift) => {
        const subject = shift.examShift?.subjectgrade?.subject;
        const grade = shift.examShift?.subjectgrade?.grade;

        if (!subject || !grade) {
          return <p key={shift.testId}>Missing information</p>;
        }

        const remainingTime = getTimeRemaining(shift.examShift.endTime);
        const isNear = remainingTime.includes('in 1 hour');

        return (
          <Card key={shift.testId} className="mb-3">
            <Card.Body>
              <Card.Title>{subject.Name} - {grade.Name}</Card.Title>
              <Card.Text>
                <strong>Exam Shift:</strong> {shift.examShift.name}<br />
                <strong>Date:</strong> {new Date(shift.examShift.startTime).toLocaleDateString()}<br />
                <strong>Time:</strong> {new Date(shift.examShift.startTime).toLocaleTimeString()} - {new Date(shift.examShift.endTime).toLocaleTimeString()}<br />
                <strong>Time Remaining:</strong> <span style={{ color: isNear ? 'red' : 'green' }}>{remainingTime}</span>
              </Card.Text>
              <Button variant="primary">Take Exam</Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default ExamShiftCard;
