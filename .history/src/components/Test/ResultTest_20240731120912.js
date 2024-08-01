import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ResultTest.css'; // Import your CSS file for styling

const TestDetails = () => {
    const { id } = useParams(); // Get the test ID from the route parameters
    const [test, setTest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDetails, setShowDetails] = useState(false); // State to toggle question details

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

    // Convert CompletionTime from seconds to minutes
    const completionTimeInMinutes = test.CompletionTime ? Math.floor(test.CompletionTime / 60) : 'N/A';
    const completionTimeInSeconds = test.CompletionTime ? test.CompletionTime % 60 : 'N/A';

    // Calculate correct and incorrect answers
    const correctAnswersCount = test.answers.filter(answer => answer.SelectedOption === answer.question_answer.CorrectOption).length;
    const incorrectAnswersCount = test.answers.length - correctAnswersCount;
    const totalAnswersCount = test.answers.length;

    // Calculate percentage of correct answers
    const percentageCorrect = totalAnswersCount > 0 ? (correctAnswersCount / totalAnswersCount) * 100 : 0;

    return (
        <div>
            <h1 className='text-center'>Test Details</h1>
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <div className='completion-time'>
                    <p><strong>Completion Time:</strong> {completionTimeInMinutes !== 'N/A' ? `${completionTimeInMinutes}m ${completionTimeInSeconds}s` : 'N/A'}</p>
                    <p><strong>Exam Shift Name:</strong> {test.exam_shift ? test.exam_shift.Name : 'N/A'}</p>
                    <p className='me-3 text-success'><strong>Correct Answers:</strong> {correctAnswersCount}</p>
                    <p className='me-3 text-danger'><strong>Incorrect Answers:</strong> {incorrectAnswersCount}</p>
                </div>
                <div className='score-container'>
    <div className='score-label'>
        <span><b>Correct Answer Percentage:</b> {Math.round(percentageCorrect)}%</span>
    </div>
    <div className='score-circle-container'>
        <svg className='progress-circle' width='100' height='100' viewBox='0 0 100 100'>
            <circle className='background-circle' cx='50' cy='50' r='45' />
            <circle
                className='progress-circle-path'
                cx='50'
                cy='50'
                r='45'
                strokeDasharray={`${percentageCorrect * 2.83} 283`}
                strokeDashoffset='70'
            />
            <text className='percentage-text' x='50%' y='50%' textAnchor='middle' dy='.3em'>
                {Math.round(percentageCorrect)}%
            </text>
        </svg>
    </div>
</div>


                <div className='score-container'>
                    <span className='score-label'><b>Score:</b></span>
                    <span className='score-circle'>{test.Score !== null ? test.Score : 'N/A'}</span>
                </div>
            </div>

            {/* Toggle Button */}
            <button
                className='btn btn-primary mt-4'
                onClick={() => setShowDetails(prev => !prev)}
            >
                {showDetails ? 'Hide Questions and Answers' : 'Show Details'}
            </button>

            {/* Conditional Rendering of Questions and Answers */}
            {showDetails && (
                <div className='mt-5'>
                    {test.answers && test.answers.length > 0 ? (
                        <div className='row justify-content-center'>
                            {test.answers.map((answer, index) => {
                                const isCorrect = answer.SelectedOption === answer.question_answer.CorrectOption;
                                return (
                                    <div className='col-md-6 mb-4 d-flex justify-content-center' key={answer.Id}>
                                        <div className='card' style={{ width: '100%' }}>
                                            <div className='card-body'>
                                                <p className='card-text'><strong>Question {index + 1}:</strong> {answer.question_answer.Content}</p>
                                                <p className={`card-text ${!isCorrect ? 'text-danger' : 'text-success'}`}><strong>Your Answer:</strong> {answer.SelectedOption}. {getOptionContent(answer.question_answer, answer.SelectedOption)}</p>
                                                {!isCorrect && (
                                                    <p className='card-text text-success'>
                                                        <strong>Correct Answer:</strong> {answer.question_answer.CorrectOption}. {getOptionContent(answer.question_answer, answer.question_answer.CorrectOption)}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p>No answers available.</p>
                    )}
                </div>
            )}
        </div>
    );
};

// Helper function to get the content of the option
const getOptionContent = (question, option) => {
    switch (option) {
        case 'A':
            return question.OptionA;
        case 'B':
            return question.OptionB;
        case 'C':
            return question.OptionC;
        case 'D':
            return question.OptionD;
        default:
            return 'N/A';
    }
};

export default TestDetails;
