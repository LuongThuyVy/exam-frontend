import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

function UserList() {
  const [accounts, setAccounts] = useState([]);
  const [selectedExaminee, setSelectedExaminee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchAccounts();
  }, [currentPage]);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/users?page=${currentPage}`);
      setAccounts(response.data.data); // Assuming paginated data is in 'data'
    } catch (err) {
      console.error('Error fetching accounts:', err);
      setError('Error fetching accounts.');
    }
  };

  const handleShowDetails = (examinee) => {
    if (examinee) {
      setSelectedExaminee(examinee);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedExaminee(null);
  };

  const handleToggleLock = async (id, currentStatus) => {
    try {
      await axios.patch(`http://localhost:8000/api/user/${id}`, {
        LockEnable: !currentStatus
      });
      fetchAccounts(); // Refresh the list after toggling
    } catch (err) {
      console.error('Error toggling lock:', err);
      setError('Error toggling lock.');
    }
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Lock Enable</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.email}</td>
              <td>{account.phone}</td>
              <td>
                <Form.Check
                  type="switch"
                  id={`lock-switch-${account.id}`}
                  checked={account.lock_enable}
                  onChange={() => handleToggleLock(account.id, account.lock_enable)}
                />
              </td>
              <td>
                <Button variant="info" onClick={() => handleShowDetails(account.examinee)}>
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Examinee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedExaminee && (
            <>
              <p><strong>Full Name:</strong> {selectedExaminee.full_name}</p>
              <p><strong>Birth:</strong> {selectedExaminee.birth}</p>
              <p><strong>Gender:</strong> {selectedExaminee.gender === 'M' ? 'Male' : selectedExaminee.gender === 'F' ? 'Female' : 'Other'}</p>
              <p><strong>Address Detail:</strong> {selectedExaminee.address_detail}</p>
              <p><strong>Grade ID:</strong> {selectedExaminee.grade.name}</p> {/* Display the grade name instead of ID */}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Pagination controls */}
      <div className="pagination-controls">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </Button>
        <span>Page {currentPage}</span>
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default UserList;
