import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Spinner, Alert, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const ExamManager = () => {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedExam, setSelectedExam] = useState(null);
    const [formData, setFormData] = useState({
        Name: '',
        Description: '',
        Duration: '',
        TotalQuestions: '',
        SubjectGradeId: ''
    });

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        try {
            const response = await axios.get('/api/exams');
            setExams(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch exams');
            setLoading(false);
        }
    };

    const handleEditClick = (exam) => {
        setSelectedExam(exam);
        setFormData({
            Name: exam.name,
            Description: exam.description,
            Duration: exam.duration,
            TotalQuestions: exam.totalQuestions,
            SubjectGradeId: exam.subjectGradeId
        });
        setShowModal(true);
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`/api/exams/${id}`);
            fetchExams();
        } catch (err) {
            setError('Failed to delete exam');
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/exams/${selectedExam.id}`, formData);
            fetchExams();
            setShowModal(false);
        } catch (err) {
            setError('Failed to update exam');
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
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Duration</th>
                                <th>Total Questions</th>
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
                                    <td>
                                        <Button variant="warning" onClick={() => handleEditClick(exam)}>Edit</Button>
                                        <Button variant="danger" onClick={() => handleDeleteClick(exam.id)}>Delete</Button>
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
                                <Form.Group controlId="formSubjectGradeId">
                                    <Form.Label>SubjectGrade ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="SubjectGradeId"
                                        value={formData.SubjectGradeId}
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Save Changes
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
