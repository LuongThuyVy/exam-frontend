import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [grades, setGrades] = useState([]);
  const [selectedExaminee, setSelectedExaminee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchData() {
      try {
        const [accountsResponse, gradesResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/users', {
            params: {
              page: currentPage,
              per_page: itemsPerPage
            }
          }),
          axios.get('http://localhost:8000/api/grades')
        ]);
  
        // Sort accounts by CreateDate in descending order
        const sortedAccounts = accountsResponse.data.data.sort((a, b) => new Date(b.CreateDate) - new Date(a.CreateDate));
        setAccounts(sortedAccounts);
        setTotalPages(accountsResponse.data.last_page); // Total number of pages
        setGrades(gradesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data.');
      }
    }
  
    fetchData();
  }, [currentPage]);

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
      await axios.put(`http://localhost:8000/api/users/lock/${accountId}`, {
        LockEnable: !currentStatus
      });
      // Refresh the account list to reflect changes
      const response = await axios.get('http://localhost:8000/api/users', {
        params: {
          page: currentPage,
          per_page: itemsPerPage
        }
      });
      const sortedAccounts = response.data.data.sort((a, b) => new Date(b.CreateDate) - new Date(a.CreateDate));
      setAccounts(sortedAccounts);
    } catch (error) {
      console.error('Error updating lock status:', error);
      setError('Error updating lock status.');
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

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
    <h1 className='text-center '>Account Management</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Phone</th>
            <th>Active</th>
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

      <div className="pagination-controls">
        <Button
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
        >
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default AccountList;
