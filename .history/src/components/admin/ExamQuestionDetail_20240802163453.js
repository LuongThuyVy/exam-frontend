import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const ExamDetails = () => {
    const { examId } = useParams();
    const [exam, setExam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExamDetails = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/exams/${examId}`);
                setExam(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch exam details:', err);
                setError('Failed to fetch exam details');
                setLoading(false);
            }
        };

        fetchExamDetails();
    }, [examId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Exam Details</h1>
            {exam && (
                <>
                    <p>Name: {exam.name}</p>
                    <p>Description: {exam.description}</p>
                    <p>Duration: {exam.duration}</p>
                    <p>Total Questions: {exam.totalQuestions}</p>
                    <p>Subject: {exam.subject ? exam.subject.name : ''}</p>
                    <p>Grade: {exam.grade ? exam.grade.name : ''}</p>
                </>
            )}
        </div>
    );
};

export default ExamDetails;
