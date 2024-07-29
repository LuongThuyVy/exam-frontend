import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SubjectManager from './SubjectManager';
import AccountList from './AccountList';
import ExamShiftList from './ExamShiftList';

const Admin = () => {
  return (
    <div className="admin-container">
     
      <div className="admin-content">
        <Routes>
          <Route path="subjects" element={<SubjectManager />} />
          <Route path="add-question" element={<AddQuestionForm />} />
          <Route path="accounts" element={<AccountList />} />
          <Route path="exam-shifts" element={<ExamShiftList />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
