import React, { useState, useEffect } from 'react';
import { Container, Table, Badge } from 'react-bootstrap';
import axios from 'axios';

const TestList = () => {
    const [tests, setTests] = useState([]);

    useEffect(() => {
        axios.get('/tests')
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
                        <th>Test ID</th>
                        <th>Examinee</th>
                        <th>Exam Shift</th>
                        <th>Score</th>
                        <th>Completion Time</th>
                        <th>Answers</th>
                    </tr>
                </thead>
                <tbody>
                    {tests.map(test => (
                        <tr key={test.Id}>
                            <td>{test.Id}</td>
                            <td>{test.examinee.FullName}</td>
                            <td>{test.exam_shift.Name}</td>
                            <td>{test.Score !== null ? test.Score : 'N/A'}</td>
                            <td>{test.CompletionTime !== null ? test.CompletionTime : 'N/A'}</td>
                            <td>
                                {test.answers.length > 0 ? (
                                    <ul>
                                        {test.answers.map(answer => (
                                            <li key={answer.Id}>
                                                QuestionAnswerId: {answer.QuestionAnswerId}, SelectedOption: {answer.SelectedOption}, Correct: {answer.IsCorrect ? 'Yes' : 'No'}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    'No answers'
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default TestList;
