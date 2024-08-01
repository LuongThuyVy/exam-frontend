import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';

const TestList = () => {
    const [tests, setTests] = useState([]);

    useEffect(() => {
        // Lấy accountId từ local storage
        const accountId = JSON.parse(localStorage.getItem('user'))?.id || 1; // Thay đổi giá trị mặc định nếu cần

        // Gọi API để lấy danh sách bài kiểm tra
        axios.get(`http://localhost:8000/api/tests/history/${accountId}`)
            .then(response => {
                setTests(response.data);
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
                        <tr key={test.testId}>
                            <td>{test.examShift.name}</td>
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
