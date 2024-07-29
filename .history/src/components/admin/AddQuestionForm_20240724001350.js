import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

function AddQuestionForm() {
  const [content, setContent] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctOption, setCorrectOption] = useState('A');
  const [subjectGradeId, setSubjectGradeId] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/question_answers', {
        Content: content,
        Difficulty: difficulty,
        OptionA: optionA,
        OptionB: optionB,
        OptionC: optionC || null, // Allow null values
        OptionD: optionD || null, // Allow null values
        CorrectOption: correctOption,
        SubjectGradeId: subjectGradeId,
      });

      setSuccess('Câu hỏi đã được thêm thành công!');
      setError(null);
      // Clear the form
      setContent('');
      setDifficulty('Easy');
      setOptionA('');
      setOptionB('');
      setOptionC('');
      setOptionD('');
      setCorrectOption('A');
      setSubjectGradeId('');
    } catch (err) {
      setError('Có lỗi xảy ra khi thêm câu hỏi.');
      setSuccess(null);
    }
  };

  return (
    <div>
      <h2>Thêm Câu Hỏi</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formContent">
          <Form.Label>Nội dung câu hỏi</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDifficulty">
          <Form.Label>Độ khó</Form.Label>
          <Form.Control
            as="select"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            required
          >
            <option value="Easy">Dễ</option>
            <option value="Normal">Trung bình</option>
            <option value="Hard">Khó</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formOptionA">
          <Form.Label>Lựa chọn A</Form.Label>
          <Form.Control
            type="text"
            value={optionA}
            onChange={(e) => setOptionA(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formOptionB">
          <Form.Label>Lựa chọn B</Form.Label>
          <Form.Control
            type="text"
            value={optionB}
            onChange={(e) => setOptionB(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formOptionC">
          <Form.Label>Lựa chọn C</Form.Label>
          <Form.Control
            type="text"
            value={optionC}
            onChange={(e) => setOptionC(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formOptionD">
          <Form.Label>Lựa chọn D</Form.Label>
          <Form.Control
            type="text"
            value={optionD}
            onChange={(e) => setOptionD(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formCorrectOption">
          <Form.Label>Lựa chọn đúng</Form.Label>
          <Form.Control
            as="select"
            value={correctOption}
            onChange={(e) => setCorrectOption(e.target.value)}
            required
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formSubjectGradeId">
          <Form.Label>Subject Grade ID</Form.Label>
          <Form.Control
            type="number"
            value={subjectGradeId}
            onChange={(e) => setSubjectGradeId(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Thêm câu hỏi
        </Button>
      </Form>
    </div>
  );
}

export default AddQuestionForm;
