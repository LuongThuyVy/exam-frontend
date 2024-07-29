import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const AddQuestionForm = () => {
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [formData, setFormData] = useState({
    Content: '',
    Difficulty: 'Easy',
    OptionA: '',
    OptionB: '',
    OptionC: '',
    OptionD: '',
    CorrectOption: 'A',
    SubjectId: '',
    GradeId: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectRes, gradeRes] = await Promise.all([
          axios.get('http://localhost:8000/api/subjects'),
          axios.get('http://localhost:8000/api/grades')
        ]);
        setSubjects(subjectRes.data);
        setGrades(gradeRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/questions', formData);
      console.log('Question added:', response.data);
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          type="text"
          name="Content"
          value={formData.Content}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Difficulty</Form.Label>
        <Form.Control
          as="select"
          name="Difficulty"
          value={formData.Difficulty}
          onChange={handleChange}
          required
        >
          <option value="Easy">Easy</option>
          <option value="Normal">Normal</option>
          <option value="Hard">Hard</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Option A</Form.Label>
        <Form.Control
          type="text"
          name="OptionA"
          value={formData.OptionA}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Option B</Form.Label>
        <Form.Control
          type="text"
          name="OptionB"
          value={formData.OptionB}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Option C</Form.Label>
        <Form.Control
          type="text"
          name="OptionC"
          value={formData.OptionC}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Option D</Form.Label>
        <Form.Control
          type="text"
          name="OptionD"
          value={formData.OptionD}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Correct Option</Form.Label>
        <Form.Control
          as="select"
          name="CorrectOption"
          value={formData.CorrectOption}
          onChange={handleChange}
          required
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Subject</Form.Label>
        <Form.Control
          as="select"
          name="SubjectId"
          value={formData.SubjectId}
          onChange={handleChange
