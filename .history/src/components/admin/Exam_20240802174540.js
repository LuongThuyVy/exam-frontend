import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Spinner, Alert, Modal, Form } from 'react-bootstrap';
import {FaEdit, FaTrash, FaPlus , FaEye } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const API_BASE_URL = 'http://localhost:8000/api';

const ExamManager = () => {
    const [exams, setExams] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedExam, setSelectedExam] = useState(null);
    const [examToDelete, setExamToDelete] = useState(null);
    const [formData, setFormData] = useState({
        Name: '',
        Description: '',
        Duration: '',
        TotalQuestions: '',
        SubjectId: '',
        GradeId: ''
    });

    const navigate = useNavigate(); // Initialize useNavigate

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
            console.error('Failed to fetch exams:', err);
            setError('Failed to fetch exams');
            setLoading(false);
        }
    };

    const fetchSubjects = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/subjects`);
            setSubjects(response.data);
        } catch (err) {
            console.error('Failed to fetch subjects:', err);
            setError('Failed to fetch subjects');
        }
    };

    const fetchGrades = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/grades`);
            setGrades(response.data);
        } catch (err) {
            console.error('Failed to fetch grades:', err);
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
            SubjectId: exam.subject ? exam.subject.id : '',
            GradeId: exam.grade ? exam.grade.id : ''
        });
        setShowModal(true);
    };

    const handleDeleteClick = (exam) => {
        setExamToDelete(exam);
        setShowConfirmModal(true);
    };

    const confirmDelete = async () => {
        if (examToDelete) {
            try {
                await axios.delete(`${API_BASE_URL}/exams/${examToDelete.id}`);
                fetchExams();
                setShowConfirmModal(false);
            } catch (err) {
                console.error('Failed to delete exam:', err);
                setError('Failed to delete exam');
            }
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
                await axios.put(`${API_BASE_URL}/exams/${selectedExam.id}`, formData);
                fetchExams();
                setShowModal(false);
            } else {
                await axios.post(`${API_BASE_URL}/exams`, formData);
                fetchExams();
                setShowAddModal(false);
            }
        } catch (err) {
            console.error('Failed to save exam:', err.response ? err.response.data : err.message);
            setError('Failed to save exam: ' + (err.response ? err.response.data.message : err.message));
        }
    };

    const handleViewDetailsClick = (examId) => {
        navigate(`/questions/${examId}`); // Navigate to the exam details page
    };

    return (
        <Container>
            <h1 className="text-center">Exam Manager</h1>
            {loading ? (
                <Spinner animation="border" />
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <>
                    <Button variant="primary" onClick={handleAddClick} className="mb-3">Add Exam <FaPlus /></Button>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
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
                                    <td>{exam.name}</td>
                                    <td>{exam.description}</td>
                                    <td>{exam.duration}</td>
                                    <td>{exam.totalQuestions}</td>
                                    <td>{exam.subject ? exam.subject.name : ''}</td>
                                    <td>{exam.grade ? exam.grade.name : ''}</td>
                                    <td>
                                  
                                        <Button variant="" onClick={() => handleEditClick(exam)}><FaEdit className='text-warning'/></Button>
                                        <Button variant="" onClick={() => handleDeleteClick(exam)}><FaTrash className='text-danger'/></Button>
                                        <Button variant="" className="mr-2" onClick={() => handleViewDetailsClick(exam.id)}>
                                            <FaEye className='text-success'/>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

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

                    <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Delete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete this exam?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={confirmDelete}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </Container>
    );
};

export default ExamManager;
