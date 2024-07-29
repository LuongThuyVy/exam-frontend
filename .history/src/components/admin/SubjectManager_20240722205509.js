import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';

function SubjectManager() {
  const [subjects, setSubjects] = useState([]);
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentSubject, setCurrentSubject] = useState({ id: null, name: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/subjects');
      setSubjects(response.data);
      setError(null); // Reset error on successful fetch
    } catch (err) {
      setError('Lỗi khi lấy dữ liệu môn học.');
    }
  };

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setEditMode(false);
    setCurrentSubject({ id: null, name: '' });
    setError(null); // Reset error on close
  };

  const handleChange = (e) => {
    setCurrentSubject({ ...currentSubject, name: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:8000/api/subjects/${currentSubject.id}`, currentSubject);
      } else {
        await axios.post('http://localhost:8000/api/subjects', currentSubject);
      }
      fetchSubjects();
      handleClose();
    } catch (err) {
      setError('Lỗi khi thêm hoặc sửa môn học.');
    }
  };

  const handleEdit = (subject) => {
    setCurrentSubject(subject);
    setEditMode(true);
    handleShow();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/subjects/${id}`);
      fetchSubjects();
    } catch (err) {
      setError('Lỗi khi xóa môn học.');
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow} className="mb-3">
        Thêm môn học
      </Button>
      
      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover>
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
                <Button variant="warning" onClick={() => handleEdit(subject)} className="me-2">
                  Sửa
                </Button>
                <Button variant="danger" onClick={() => handleDelete(subject.id)}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Sửa môn học' : 'Thêm môn học'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formSubjectName">
              <Form.Label>Tên môn học</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên môn học"
                value={currentSubject.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              {editMode ? 'Lưu thay đổi' : 'Thêm môn học'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SubjectManager;
