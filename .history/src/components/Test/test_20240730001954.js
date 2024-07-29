import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Alert } from 'react-bootstrap';

const StartTestPage = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [error, setError] = useState(null);
  const [testId, setTestId] = useState(null);

  const handleStartTestClick = async () => {
    try {
      // Open the confirmation modal
      setShowConfirmModal(true);
    } catch (err) {
      setError('Failed to initiate the start test process.');
    }
  };

  const handleConfirmStartTest = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/exam-schedule/${testId}`);
      const tests = response.data;

      if (tests.length === 0) {
        setError('Test has not started yet.');
      } else {
        window.location.href = '/test';
      }
    } catch (err) {
      setError('Error starting the test.');
    } finally {
      setShowConfirmModal(false);
    }
  };

  return (
    <div>
      <h1>Start Your Test</h1>

      <Button variant="primary" onClick={handleStartTestClick}>
        Start Test
      </Button>

      {/* Error Alert */}
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Test Start</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to start the test?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmStartTest}>
            Start Test
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StartTestPage;
