import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddQuestionForm from './AddQuestionForm';
import AccountList from './AccountList';
import ExamShiftList from './ExamShiftList';
import Exam from './Exam';
import '../../App.css';

const Admin = () => {
  return (
    <div className="admin-container">
      <div className="admin-content">
        <Routes>
        <Route path="/questions/:id" element={<ResultTest />} />
          <Route path="/questions" element={<AddQuestionForm />} />
          <Route path="/accounts" element={<AccountList />} />
          <Route path="/exam-shifts" element={<ExamShiftList />} />
          <Route path="/exams" element={<Exam />} />

        </Routes>
      </div>
    </div>
  );
};

export default Admin;
