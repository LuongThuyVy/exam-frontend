import React from 'react';
import SubjectManager from './SubjectManager';
import AddQuestionForm from './AddQuestionForm';
import AccountList from './AccountList';
import ExamShiftList from './ExamShiftList';

function Admin() {
  return (
    <div className="container mt-5">
      {/* <h1 className="text-center">Quản lý môn học</h1> */}
      {/* <SubjectManager /> */}
      {/* <AddQuestionForm/> */}
      {/* <AccountList/> */}
      <ExamShiftList />
    </div>
  );
}

export default Admin;