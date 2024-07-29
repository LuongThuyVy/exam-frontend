import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const SubjectManager = () => {
    const [subjects, setSubjects] = useState([]);
    const [newSubject, setNewSubject] = useState('');
    const [editSubject, setEditSubject] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        const response = await axios.get('/api/subjects');
        setSubjects(response.data);
    };

    const handleAddSubject = async () => {
        if (newSubject.trim() === '') return;
        await axios.post('/api/subjects', { name: newSubject });
        setNewSubject('');
        fetchSubjects();
    };

    const handleEditSubject = async () => {
        await axios.put(`/api/subjects/${editSubject.id}`, { name: editSubject.name });
        setShowEditModal(false);
        setEditSubject(null);
        fetchSubjects();
    };

    const handleDeleteSubject = async (id) => {
        await axios.delete(`/api/subjects/${id}`);
        fetchSubjects();
    };

    return (
        <div className="container mt-5">
            <h1>Quản lý Môn học</h1>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Tên môn học mới"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                />
                <Button variant="primary" className="mt-2" onClick={handleAddSubject}>
                    Thêm Môn học
                </Button>
            </Form.Group>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên môn học</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map((subject) => (
                        <tr key={subject.id}>
                            <td>{subject.id}</td>
                            <td>{subject.name}</td>
                            <td>
                                <Button variant="warning" onClick={() => { setEditSubject(subject); setShowEditModal(true); }}>
                                    Sửa
                                </Button>{' '}
                                <Button variant="danger" onClick={() => handleDeleteSubject(subject.id)}>
                                    Xóa
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {editSubject && (
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sửa môn học</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control
                            type="text"
                            value={editSubject.name}
                            onChange={(e) => setEditSubject({ ...editSubject, name: e.target.value })}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                            Đóng
                        </Button>
                        <Button variant="primary" onClick={handleEditSubject}>
                            Lưu thay đổi
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default SubjectManager;
