import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function QuestionForm() {
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
    SubjectGradeId: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [subjectsResponse, gradesResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/subjects'),
          axios.get('http://localhost:8000/api/grades')
        ]);

        setSubjects(subjectsResponse.data);
        setGrades(gradesResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/questions', formData);
      // Handle success (e.g., show a success message or redirect)
    } catch (err) {
      setError('Error adding question.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="formContent">
        <Form.Label>Content</Form.Label>
        <Form.Control
          type="text"
          name="Content"
          value={formData.Content}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formDifficulty">
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

      <Form.Group controlId="formOptionA">
        <Form.Label>Option A</Form.Label>
        <Form.Control
          type="text"
          name="OptionA"
          value={formData.OptionA}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formOptionB">
        <Form.Label>Option B</Form.Label>
        <Form.Control
          type="text"
          name="OptionB"
          value={formData.OptionB}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formOptionC">
        <Form.Label>Option C (Optional)</Form.Label>
        <Form.Control
          type="text"
          name="OptionC"
          value={formData.OptionC}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formOptionD">
        <Form.Label>Option D (Optional)</Form.Label>
        <Form.Control
          type="text"
          name="OptionD"
          value={formData.OptionD}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formCorrectOption">
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

      <Form.Group controlId="formSubjectGrade">
        <Form.Label>Subject and Grade</Form.Label>
        <Form.Control
          as="select"
          name="SubjectGradeId"
          value={formData.SubjectGradeId}
          onChange={handleChange}
          required
        >
          <option value="">Select Subject and Grade</option>
          {subjects.map((subject) =>
            grades.map((grade) => (
              <option key={`${subject.id}-${grade.id}`} value={`${subject.id}-${grade.id}`}>
                {subject.name} - {grade.name}
              </option>
            ))
          )}
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        Submit
      </Button>
    </Form>
  );
}

export default QuestionForm;
