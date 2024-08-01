// src/components/TestHistory.js

import React, { useState, useEffect } from 'react';
import { Table, Container, Spinner, Alert } from 'react-bootstrap';

const TestHistory = () => {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/tests') // Cập nhật URL nếu cần
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.tests) {
                    setTests(data.tests);
                } else {
                    setError('No tests found');
                }
            })
            .catch(err => {
                setError('Error fetching tests');
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <Container>
            <h1 className="my-4">Test History</h1>
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            {!loading && !error && (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Examinee ID</th>
                            <th>Exam Shift ID</th>
                            <th>Score</th>
                            <th>Completion Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tests.map(test => (
                            <tr key={test.id}>
                                <td>{test.id}</td>
                                <td>{test.examineeId}</td>
                                <td>{test.examShiftId}</td>
                                <td>{test.score !== null ? test.score : 'N/A'}</td>
                                <td>{test.completionTime ? new Date(test.completionTime).toLocaleString() : 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default TestHistory;
