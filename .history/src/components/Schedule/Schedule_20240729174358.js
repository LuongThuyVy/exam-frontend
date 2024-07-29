import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const ExamShiftList = () => {
    const [examShifts, setExamShifts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch exam shifts for the current account
        const fetchExamShifts = async () => {
            try {
                const accountId = localStorage.getItem('id'); // Adjust according to your data
                const response = await axios.get(`/api/schedule/${accountId}`);
                setExamShifts(response.data);
            } catch (error) {
                console.error('Error fetching exam shifts:', error);
            }
        };

        fetchExamShifts();
    }, []);

    const handleTakeExam = (examShiftId) => {
        navigate(`/exam/${examShiftId}`); // Navigate to the exam page
    };

    const renderExamShiftItem = (examShift) => {
        const now = moment();
        const startTime = moment(examShift.startTime);
        const isExamToday = now.isSame(startTime, 'day');
        const timeUntilExam = startTime.diff(now);

        return (
            <ListGroupItem key={examShift.id}>
                <h5>{examShift.name}</h5>
                <p>Start Time: {moment(examShift.startTime).format('YYYY-MM-DD HH:mm:ss')}</p>
                <p>End Time: {moment(examShift.endTime).format('YYYY-MM-DD HH:mm:ss')}</p>
                
                {isExamToday ? (
                    <Button onClick={() => handleTakeExam(examShift.id)}>Take Exam</Button>
                ) : (
                    <p>Time until exam: {moment.duration(timeUntilExam).humanize()}</p>
                )}
            </ListGroupItem>
        );
    };

    return (
        <div>
            <h2>Upcoming Exam Shifts</h2>
            <ListGroup>
                {examShifts.map(renderExamShiftItem)}
            </ListGroup>
        </div>
    );
};

export default Sceh;
