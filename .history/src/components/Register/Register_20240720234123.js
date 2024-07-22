import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import './Register.css';

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
  const [grades, setGrades] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/grades')
      .then(response => {
        setGrades(response.data);
      })
      .catch(error => {
        console.error('Error fetching grades:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });

    // Remove the error for the current field if the value is updated
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const validateStep1 = () => {
    const { full_name, birth, gender, phone, grade_id } = formData;
    let valid = true;
    let newErrors = {};

    if (!full_name) {
      newErrors.full_name = "Full name is required";
      valid = false;
    }
    if (!birth) {
      newErrors.birth = "Birth date is required";
      valid = false;
    }
    if (!gender) {
      newErrors.gender = "Gender is required";
      valid = false;
    }
    if (!phone) {
      newErrors.phone = "Phone number is required";
      valid = false;
    }
    if (!grade_id) {
      newErrors.grade_id = "Grade is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/register', formData)
      .then(response => {
        setSuccess('Registration successful');
        setErrors({});
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        }
      });
  };

  return (
    <Container className="mt-4 col-sm-6 offset-sm-3 mb-5">
      <h2>Register</h2>
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <Form.Group controlId="formFullName" className="mt-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                isInvalid={!!errors.full_name}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.full_name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBirth" className="mt-3">
              <Form.Label>Birth Date</Form.Label>
              <Form.Control
                type="date"
                name="birth"
                value={formData.birth}
                onChange={handleChange}
                isInvalid={!!errors.birth}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.birth}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formGender" className="mt-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                isInvalid={!!errors.gender}
                required
              >
                {/* <option value="">Select gender</option> */}
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.gender}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPhone" className="mt-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formGradeId" className="mt-3">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                as="select"
                name="grade_id"
                value={formData.grade_id}
                onChange={handleChange}
                isInvalid={!!errors.grade_id}
                required
              >
                <option value="">Select grade</option>
                {grades.map(grade => (
                  <option key={grade.id} value={grade.id}>{grade.name}</option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.grade_id}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formAddressDetail" className="mt-3">
              <Form.Label>Address Detail</Form.Label>
              <Form.Control
                type="text"
                name="address_detail"
                value={formData.address_detail}
                onChange={handleChange}
                isInvalid={!!errors.address_detail}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address_detail}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" onClick={nextStep} className="mt-3 btn-cus">Next</Button>

          </>
        )}
        {step === 2 && (
          <>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPolicyAccepted" className="mt-3">
              <Form.Check
                type="checkbox"
                name="policyAccepted"
                checked={formData.policyAccepted}
                onChange={handleChange}
                label="I have read the policy"
                isInvalid={!!errors.policyAccepted}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.policyAccepted}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="secondary" onClick={prevStep} className="mt-3 btn-cus">Back</Button>
            <Button variant="primary" type="submit" className="mt-3 btn-cus">Register</Button>
          </>
        )}
      </Form>
    </Container>
  );
}

export default Register;
