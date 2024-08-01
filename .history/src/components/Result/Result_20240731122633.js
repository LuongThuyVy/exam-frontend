import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';

const TestList = () => {
    const [tests, setTests] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api//tests')
            .then(response => {
                setTests(response.data.tests);
            })
            .catch(error => {
                console.error('Error fetching tests:', error);
            });
    }, []);

    return (
        <Container>
            <h1 className="my-4">Test List</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Exam Shift</th>
                        <th>Score</th>
                        <th>Completion Time</th>
                    </tr>
                </thead>
                <tbody>
                    {tests.map(test => (
                        <tr key={test.Id}>
                            <td>{test.exam_shift.Name}</td>
                            <td>{test.Score !== null ? test.Score : 'N/A'}</td>
                            <td>{test.CompletionTime !== null ? test.CompletionTime : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default TestList;
