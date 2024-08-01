import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Spinner, Alert, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const ExamManager = () => {
    const [exams, setExams] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedExam, setSelectedExam] = useState(null);
    const [formData, setFormData] = useState({
        Name: '',
        Description: '',
        Duration: '',
        TotalQuestions: '',
        SubjectId: '',
        GradeId: ''
    });

    useEffect(() => {
        fetchExams();
        fetchSubjects();
        fetchGrades();
    }, []);

    const fetchExams = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/exams`);
            setExams(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch exams');
            setLoading(false);
        }
    };

    const fetchSubjects = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/subjects`);
            setSubjects(response.data);
        } catch (err) {
            setError('Failed to fetch subjects');
        }
    };

    const fetchGrades = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/grades`);
            setGrades(response.data);
        } catch (err) {
            setError('Failed to fetch grades');
        }
    };

    const handleEditClick = (exam) => {
        setSelectedExam(exam);
        setFormData({
            Name: exam.name,
            Description: exam.description,
            Duration: exam.duration,
            TotalQuestions: exam.totalQuestions,
            SubjectId: exam.subject.Id,  // Updated to match the data format
            GradeId: exam.grade.id
        });
        setShowModal(true);
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/exams/${id}`);
            fetchExams(); // Reload exams list after deletion
        } catch (err) {
            setError('Failed to delete exam');
        }
    };

    const handleAddClick = () => {
        setSelectedExam(null);
        setFormData({
            Name: '',
            Description: '',
            Duration: '',
            TotalQuestions: '',
            SubjectId: '',
            GradeId: ''
        });
        setShowAddModal(true);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedExam) {
                // Update existing exam
                await axios.put(`${API_BASE_URL}/exams/${selectedExam.id}`, formData);
                fetchExams();
                setShowModal(false);
            } else {
                // Add new exam
                await axios.post(`${API_BASE_URL}/exams`, formData);
                fetchExams();
                setShowAddModal(false);
            }
        } catch (err) {
            setError('Failed to save exam');
        }
    };

    return (
        <Container>
            <h1 className="my-4">Exam Manager</h1>
            {loading ? (
                <Spinner animation="border" />
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <>
                    <Button variant="primary" onClick={handleAddClick} className="mb-3">Add Exam</Button>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Duration</th>
                                <th>Total Questions</th>
                                <th>Subject</th>
                                <th>Grade</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exams.map((exam) => (
                                <tr key={exam.id}>
                                    <td>{exam.id}</td>
                                    <td>{exam.name}</td>
                                    <td>{exam.description}</td>
                                    <td>{exam.duration}</td>
                                    <td>{exam.totalQuestions}</td>
                                    <td>{exam.subject.name}
                                    <td>{grades.find(grade => grade.id === exam.grade.id)?.name}</td>
                                    <td>
                                        <Button variant="warning" onClick={() => handleEditClick(exam)}>Edit</Button>
                                        <Button variant="danger" onClick={() => handleDeleteClick(exam.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* Edit Exam Modal */}
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Exam</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleFormSubmit}>
                                <Form.Group controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Name"
                                        value={formData.Name}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Description"
                                        value={formData.Description}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formDuration">
                                    <Form.Label>Duration</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="Duration"
                                        value={formData.Duration}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formTotalQuestions">
                                    <Form.Label>Total Questions</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="TotalQuestions"
                                        value={formData.TotalQuestions}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formSubjectId">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="SubjectId"
                                        value={formData.SubjectId}
                                        onChange={handleFormChange}
                                    >
                                        <option value="">Select Subject</option>
                                        {subjects.map(subject => (
                                            <option key={subject.Id} value={subject.Id}>{subject.Name}</option> 
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formGradeId">
                                    <Form.Label>Grade</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="GradeId"
                                        value={formData.GradeId}
                                        onChange={handleFormChange}
                                    >
                                        <option value="">Select Grade</option>
                                        {grades.map(grade => (
                                            <option key={grade.id} value={grade.id}>{grade.name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Save Changes
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>

                    {/* Add Exam Modal */}
                    <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Exam</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleFormSubmit}>
                                <Form.Group controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Name"
                                        value={formData.Name}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Description"
                                        value={formData.Description}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formDuration">
                                    <Form.Label>Duration</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="Duration"
                                        value={formData.Duration}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formTotalQuestions">
                                    <Form.Label>Total Questions</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="TotalQuestions"
                                        value={formData.TotalQuestions}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formSubjectId">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="SubjectId"
                                        value={formData.SubjectId}
                                        onChange={handleFormChange}
                                    >
                                        <option value="">Select Subject</option>
                                        {subjects.map(subject => (
                                            <option key={subject.Id} value={subject.Id}>{subject.Name}</option> 
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formGradeId">
                                    <Form.Label>Grade</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="GradeId"
                                        value={formData.GradeId}
                                        onChange={handleFormChange}
                                    >
                                        <option value="">Select Grade</option>
                                        {grades.map(grade => (
                                            <option key={grade.id} value={grade.id}>{grade.name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Add Exam
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>
            )}
        </Container>
    );
};

export default ExamManager;
