// TestDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, ListGroup } from 'react-bootstrap';

const TestDetail = () => {
    const [test, setTest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch test data when component mounts
    useEffect(() => {
        const fetchData = async () => {
            const testId = localStorage.getItem('testId');
            if (!testId) {
                setError('Test ID not found in local storage.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`/api/tests/${testId}`);
                setTest(response.data.test);
            } catch (err) {
                setError('Error fetching test data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Container>
            <Card className="my-4">
                <Card.Header as="h5">Test Details</Card.Header>
                <Card.Body>
                    <Card.Title>Test ID: {test.Id}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Completion Time: {test.CompletionTime}</Card.Subtitle>
                    <Card.Text>
                        <strong>Exam Shift Details:</strong>
                    </Card.Text>
                    <ListGroup>
                        <ListGroup.Item>Name: {test.examShift.Name}</ListGroup.Item>
                        <ListGroup.Item>Start Time: {test.examShift.StartTime}</ListGroup.Item>
                        <ListGroup.Item>End Time: {test.examShift.EndTime}</ListGroup.Item>
                        <ListGroup.Item>Subject: {test.examShift.subjectgrade.subject?.Name}</ListGroup.Item>
                        <ListGroup.Item>Grade: {test.examShift.subjectgrade.grade?.Name}</ListGroup.Item>
                    </ListGroup>
                    <Card.Text>
                        <strong>Answers:</strong>
                    </Card.Text>
                    <ListGroup>
                        {test.answers.map((answer) => (
                            <ListGroup.Item key={answer.QuestionAnswerId}>
                                Question Answer ID: {answer.QuestionAnswerId} - Selected Option: {answer.SelectedOption}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default TestDetail;
