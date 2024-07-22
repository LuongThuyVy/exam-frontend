import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import './register.css';

function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    full_name: '',
    birth: '',
    gender: '',
    phone: '',
    grade_id: '',
    address_detail: '',
    email: '',
    password: '',
    policyAccepted: false,
  });
  const [classes, setClasses] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  useEffect(() => {
    axios.get('/api/classes')
      .then(response => {
        setClasses(response.data);
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const nextStep = () => {
    setStep
