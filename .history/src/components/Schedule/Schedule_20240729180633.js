import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Alert, Row, Col, Modal } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import moment from 'moment'; // Import moment for date handling
import './Schedule.css'; // Import CSS for styling

const Schedule = () => {
  const [examShifts, setExamShifts] = useState([]);
  const [error, setError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const fetchExamShifts = async () => {
      try {
        // Retrieve user data from local storage
        const userData = localStorage.getItem('user');
        if (!userData) {
          throw new Error('User data not found');
        }

        // Parse user data
        const user = JSON.parse(userData);
        const accountId = user.id; // Ensure this matches your stored key

        // Fetch exam shifts using the updated endpoint
        const response = await axios.get(`http://localhost:8000/api/exam-shifts/user/${accountId}`);
        
        // Log the fetched data
        console.log('Fetched Exam Shifts:', response.data);
        
        setExamShifts(response.data);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Something went wrong');
        console.error('Fetch Exam Shifts Error:', err); // Log detailed error
        setExamShifts([]);
      }
    };

    fetchExamShifts();
  }, []);

  const handleSignIn = async (id) => {
    try {
      // Retrieve user data from local storage
      const userData = localStorage.getItem('user');
      
      if (!userData) {
        console.error('User data not found in local storage.');
        setError('User data not found. Please log in again.');
        return;
      }
      
      // Parse user data
      const user = JSON.parse(userData);
      const examineeId = user.id; // Ensure this matches your stored key
      
      if (!examineeId) {
        console.error('Examinee ID not found in user data.');
        setError('Examinee ID is missing. Please log in again.');
        return;
      }

      // Prepare the payload
