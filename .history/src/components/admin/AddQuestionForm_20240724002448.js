import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
const fetchData = async () => {
    try {
      const [subjectsResponse, gradesResponse] = await Promise.all([
        axios.get('http://localhost:8000/api/subjects'),
        axios.get('http://localhost:8000/api/grades')
      ]);
  
      console.log('Subjects data:', subjectsResponse.data);
      console.log('Grades data:', gradesResponse.data);
  
      setSubjects(subjectsResponse.data);
      setGrades(gradesResponse.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };
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
    SubjectId: '',
    GradeId: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [subjectsResponse, gradesResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/subjects'),
          axios.get('http://localhost:8000/api/grades')
        ]);

        console.log('Fetched subjects:', subjectsResponse.data);
        console.log('Fetched grades:', gradesResponse.data);

        setSubjects(subjectsResponse.data);
        setGrades(gradesResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data.');
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
      const subjectGradeId = `${formData.SubjectId}-${formData.GradeId}`;
      await axios.post('http://localhost:8000/api/questions', {
        ...formData,
        SubjectGradeId: subjectGradeId
      });
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

      <Form.Group controlId="formSubject">
        <Form.Label>Subject</Form.Label>
        <Form.Control
          as="select"
          name="SubjectId"
          value={formData.SubjectId}
          onChange={handleChange}
          required
        >
          <option value="">Select Subject</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formGrade">
        <Form.Label>Grade</Form.Label>
        <Form.Control
          as="select"
          name="GradeId"
          value={formData.GradeId}
          onChange={handleChange}
          required
        >
          <option value="">Select Grade</option>
          {grades.map((grade) => (
            <option key={grade.id} value={grade.id}>
              {grade.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        Submit
      </Button>
    </Form>
  );
}

export default QuestionForm;
