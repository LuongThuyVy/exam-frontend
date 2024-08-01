import React, { useEffect, useState } from 'react';
import { fetchTestById } from '../services/testService';
import { useParams } from 'react-router-dom'; // or use any other method to get ID

const TestDetails = () => {
    const { id } = useParams(); // Assuming you're using React Router for routing
    const [test, setTest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getTest = async () => {
            try {
                const data = await fetchTestById(id);
                setTest(data.test);
            } catch (error) {
                setError('Failed to fetch test details.');
            } finally {
                setLoading(false);
            }
        };

        getTest();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!test) return <p>No test found.</p>;

    return (
        <div>
            <h2>Test Details</h2>
            <p><strong>Examinee:</strong> {test.examinee?.name || 'N/A'}</p>
            <p><strong>Exam Shift:</strong> {test.examShift?.name || 'N/A'}</p>
            <p><strong>Score:</strong> {test.Score || 'N/A'}</p>
            <p><strong>Completion Time:</strong> {test.CompletionTime || 'N/A'}</p>
            <h3>Answers:</h3>
            <ul>
                {test.answers && test.answers.map(answer => (
                    <li key={answer.Id}>{answer.answerText}</li>
                ))}
            </ul>
        </div>
    );
};

export default TestDetails;
