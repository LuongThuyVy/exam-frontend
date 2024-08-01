import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TestDetails = () => {
    const { id } = useParams(); // Get the test ID from the route parameters
    const [test, setTest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(`Fetching details for test ID: ${id}`); // Log the test ID

        const getTest = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/tests/${id}`); // Call the API directly
                setTest(response.data.test); // Set the test data to state
            } catch (error) {
                setError('Failed to fetch test details.'); // Handle errors
                console.error('Error fetching test data:', error);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        getTest();
    }, [id]);

    if (loading) return <p>Loading...</p>; // Display loading message
    if (error) return <p>{error}</p>; // Display error message
    if (!test) return <p>No test found.</p>; // Handle case where no test is found

    // Format the completion time if it's not in a human-readable format
 

    return (
        <div>
            <h1>Test Details</h1>
            {/* <p><strong>Examinee:</strong> {test.examinee ? test.examinee.name : 'N/A'}</p> */}
            {/* <p><strong>Exam Shift:</strong> {test.examShift ? test.examShift.name : 'N/A'}</p> */}
            <p><strong>Score:</strong> {test.Score !== null ? test.Score : 'N/A'}</p>
            <p><strong>Completion Time:</strong> {test.CompletionTime}</p>
        </div>
    );
};

export default TestDetails;
