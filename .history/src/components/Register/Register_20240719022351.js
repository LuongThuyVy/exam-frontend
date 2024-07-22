import React, { useState } from 'react';
import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';
import axios from 'axios';
import { Container, Alert } from 'react-bootstrap';
import './Register.css';

function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    birth: '',
    gender: '',
    phone: '',
    grade_id: '',
    address_detail: '',
    policyAccepted: false
  });
  const [classes, setClasses] = useState([]); // Danh sách lớp học
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.policyAccepted) {
      setErrors({ ...errors, policyAccepted: ['You must accept the policy.'] });
      return;
    }

    try {
      const response = await axios.post('/api/register', formData);
      setSuccess('Registration successful!');
      setErrors({});
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
      setSuccess('');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Register</h2>
      {success && <Alert variant="success">{success}</Alert>}
      {Object.keys(errors).length > 0 && (
        <Alert variant="danger">
          {Object.keys(errors).map((key) => (
            <div key={key}>{errors[key].join(', ')}</div>
          ))}
        </Alert>
      )}
      {step === 1 && (
        <RegisterStep1
          formData={formData}
          handleChange={handleChange}
          nextStep={nextStep}
          errors={errors}
        />
      )}
      {step === 2 && (
        <RegisterStep2
          formData={formData}
          handleChange={handleChange}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
          errors={errors}
        />
      )}
    </Container>
  );
}

export default Register;
