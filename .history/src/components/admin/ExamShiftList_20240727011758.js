import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const ExamShiftsManager = () => {
    const [examShifts, setExamShifts] = useState([]);
    const [exams, setExams] = useState([]);
    const [newShift, setNewShift] = useState({ Name: '', StartTime: '', EndTime: '', ExamId: '' });
    
    // Load exam shifts
    useEffect(() => {
        fetchExamShifts();
        fetchExams();
    }, []);

    const fetchExamShifts = async () => {
        try {
            const response = await axios.get('/api/exam-shifts');
            setExamShifts(response.data);
        } catch (error) {
            console.error('Error fetching exam shifts', error);
        }
    };

    const fetchExams = async () => {
        try {
            const response = await axios.get('/api/exams'); // Ensure this endpoint exists
            setExams(response.data);
        } catch (error) {
            console.error('Error fetching exams', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewShift({ ...newShift, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/exam-shifts', newShift);
            fetchExamShifts(); // Refresh the list
        } catch (error) {
            console.error('Error creating exam shift', error);
        }
    };

    return (
        <div>
            <h1>Manage Exam Shifts</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter shift name"
                        name="Name"
                        value={newShift.Name}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formStartTime">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        name="StartTime"
                        value={newShift.StartTime}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formEndTime">
                    <Form.Label>End Time</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        name="EndTime"
                        value={newShift.EndTime}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formExam">
                    <Form.Label>Exam</Form.Label>
                    <Form.Control
                        as="select"
                        name="ExamId"
                        value={newShift.ExamId}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select an exam</option>
                        {exams.map(exam => (
                            <option key={exam.Id} value={exam.Id}>
                                {exam.Name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Shift
                </Button>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Exam</th>
                    </tr>
                </thead>
                <tbody>
                    {examShifts.map(shift => (
                        <tr key={shift.Id}>
                            <td>{shift.Name}</td>
                            <td>{new Date(shift.StartTime).toLocaleString()}</td>
                            <td>{new Date(shift.EndTime).toLocaleString()}</td>
                            <td>{exams.find(exam => exam.Id === shift.ExamId)?.Name || 'Unknown'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ExamShiftsManager;
