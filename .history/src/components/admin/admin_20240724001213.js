import React from 'react';
import SubjectManager from './SubjectManager';
import AddQuestionForm from './AddQuestionForm'

function Admin() {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Quản lý môn học</h1>
      <SubjectManager />
      <AAddQuestionForm/>>
    </div>
  );
}

export default Admin;