import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { Role } from '../../Role'; 
import './Profile.css'; 

const ExamManagement = () => {
  const [exams, setExams] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch exams
        const examsResponse = await axios.get('http://localhost:8000/api/exams');
        setExams(examsResponse.data);

        // Fetch subjects
        const subjectsResponse = await axios.get('http://localhost:8000/api/subjects');
        setSubjects(subjectsResponse.data);

        // Fetch grades
        const gradesResponse = await axios.get('http://localhost:8000/api/grades');
        setGrades(gradesResponse.data);

      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching data');
      }
    };

    fetchData();
  }, []);

  const handleEdit = (exam) => {
    setSelectedExam(exam);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedExam(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedExam(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedExam) return;

    try {
      await axios.put(`http://localhost:8000/api/exams/${selectedExam.id}`, selectedExam);
      setIsEditing(false);
      setSelectedExam(null);
      setError(null);
      // Optionally refresh the exams list
      const examsResponse = await axios.get('http://localhost:8000/api/exams');
      setExams(examsResponse.data);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Error updating exam');
    }
  };

  if (error) {
    return <Card><Card.Body><p style={{ color: 'red' }}>{error}</p></Card.Body></Card>;
  }

  return (
    <Card className="exam-management-card mb-2">
      <Card.Body>
        <h1 className="exam-management-title">Exam Management</h1>
        {isEditing && selectedExam ? (
          <Form onSubmit={handleSubmit} className="exam-management-form">
            <Form.Group>
              <Form.Label>Exam Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={selectedExam.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={selectedExam.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="number"
                name="duration"
                value={selectedExam.duration}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Subject</Form.Label>
              <Form.Control
                as="select"
                name="subjectId"
                value={selectedExam.subject ? selectedExam.subject.id : ''}
                onChange={handleChange}
              >
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Grade</Form.Label>
              <Form.Control
                as="select"
                name="gradeId"
                value={selectedExam.grade ? selectedExam.grade.id : ''}
                onChange={handleChange}
              >
                {grades.map(grade => (
                  <option key={grade.id} value={grade.id}>{grade.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <div className="form-buttons mt-3">
              <Button variant="outline-danger" className="button-spacing w-50" onClick={handleCancel}>Cancel</Button>
              <Button variant="primary" type="submit" className="w-50">Save</Button>
            </div>
          </Form>
        ) : (
          <div>
            {exams.map(exam => (
              <Card key={exam.id} className="exam-card mb-2">
                <Card.Body>
                  <h5>{exam.name}</h5>
                  <p>{exam.description}</p>
                  <Button variant="link" onClick={() => handleEdit(exam)}>
                    <FaEdit /> Edit
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ExamManagement;
