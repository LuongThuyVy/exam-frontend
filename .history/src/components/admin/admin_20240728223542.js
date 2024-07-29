import React from 'react';
import SubjectManager from './SubjectManager';
import AddQuestionForm from './AddQuestionForm';
import AccountList from './AccountList';
import ExamShiftList from './ExamShiftList';

const Admin(){
  
}

function Admin() {
  return (
    <div className="container mt-5">
      
      {/* <SubjectManager /> */}
      {/* <AddQuestionForm/> */}
      {/* <AccountList/> */}
      <ExamShiftList />
    </div>
  );
}

export default Admin;