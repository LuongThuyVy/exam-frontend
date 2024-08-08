import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa'; // Import the eye icon for viewing details
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const History = () => {
    const [tests, setTests] = useState([]);
    const navigate = useNavigate(); // Initialize navigate function

    useEffect(() => {
        // Lấy accountId từ local storage
        const accountId = JSON.parse(localStorage.getItem('user'))?.id || 1; // Thay đổi giá trị mặc định nếu cần

        // Gọi API để lấy danh sách bài kiểm tra
        axios.get(`http://localhost:8000/api/tests/history/${accountId}`)
            .then(response => {
                console.log('API Response:', response.data); // In dữ liệu trả về từ API
                setTests(response.data);
            })
            .catch(error => {
                console.error('Error fetching tests:', error);
            });
    }, []);
    
    const formatCompletionTime = (timeInSeconds) => {
        if (timeInSeconds == null) return 'N/A';
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}m ${seconds}s`;
    };

    const handleViewDetails = (testId) => {
        navigate(`/test/${testId}`);
    };

    return (
        <Container>
            <h1 className="my-4 text-center">History</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Exam Shift</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Subject</th>
                        <th>Grade</th>
                        <th>Score</th>
                        <th>Completion Time</th>
                        <th>Details</th> {/* New column for details */}
                    </tr>
                </thead>
                <tbody>
                    {tests.map(test => (
                        <tr key={test.testId}>
                            <td>{test.examShift.name}</td>
                            <td>{new Date(test.examShift.startTime).toLocaleString()}</td>
                            <td>{new Date(test.examShift.endTime).toLocaleString()}</td>
                            <td>{test.examShift.subjectgrade?.subject_grade?.subject?.Name || 'N/A'}</td>
                            <td>{test.examShift.subjectgrade?.subject_grade?.grade?.Name || 'N/A'}</td>
                            <td className='text-primary'>
                            {test.score !== null ? test.score.toFixed(2) : 'Chua thi'}
                            </td>

                            <td className='text-danger'>{formatCompletionTime(test.time) !== null ?  formatCompletionTime(test.time)}</td>
                            <td>
                                <Button 
                                    variant="link" 
                                    onClick={() => handleViewDetails(test.testId)} 
                                    aria-label="View Details"
                                >
                                    <FaEye /> {/* Eye icon for viewing details */}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default History;
