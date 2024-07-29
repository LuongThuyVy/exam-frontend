import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [grades, setGrades] = useState([]);
  const [selectedExaminee, setSelectedExaminee] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [accountsResponse, gradesResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/accounts'),
          axios.get('http://localhost:8000/api/grades')
        ]);

        setAccounts(accountsResponse.data);
        setGrades(gradesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleShowDetails = (examinee) => {
    if (examinee) {
      setSelectedExaminee(examinee);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedExaminee(null);
    setShowModal(false);
  };

  const handleLockToggle = async (accountId, currentStatus) => {
    try {
      await axios.patch(`http://localhost:8000/api/users/${accountId}`, {
        LockEnable: !currentStatus
      });
      // Refresh the account list to reflect changes
      const response = await axios.get('http://localhost:8000/api/users');
      setAccounts(response.data);
    } catch (error) {
      console.error('Error updating lock status:', error);
    }
  };

  const genderLabel = (gender) => {
    switch (gender) {
      case 'M': return 'Nam';
      case 'F': return 'Nữ';
      case 'O': return 'Khác';
      default: return 'Unknown';
    }
  };

  const getGradeName = (gradeId) => {
    const grade = grades.find(g => g.id === gradeId);
    return grade ? grade.name : 'Unknown';
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Phone</th>
            <th>Lock Enable</th>
            <th>Create Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.Id}>
              <td>{account.Email}</td>
              <td>{account.Phone}</td>
              <td>
                <Form.Check
                  type="switch"
                  id={`lock-switch-${account.Id}`}
                  checked={account.LockEnable === 1}
                  onChange={() => handleLockToggle(account.Id, account.LockEnable)}
                />
              </td>
              <td>{account.CreateDate}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleShowDetails(account.examinee)}
                  disabled={!account.examinee}
                >
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
          {selectedExaminee ? (
            <div>
              <p><strong>Full Name:</strong> {selectedExaminee.FullName}</p>
              <p><strong>Birth:</strong> {selectedExaminee.Birth}</p>
              <p><strong>Gender:</strong> {genderLabel(selectedExaminee.Gender)}</p>
              <p><strong>Address Detail:</strong> {selectedExaminee.AddressDetail}</p>
              <p><strong>Grade:</strong> {getGradeName(selectedExaminee.GradeId)}</p>
            </div>
          ) : (
            <p>No details available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AccountList;
