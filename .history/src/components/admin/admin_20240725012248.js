import React from 'react';
import SubjectManager from './SubjectManager';
import AddQuestionForm from './AddQuestionForm';
import AccountList from './AccountList';


function Admin() {
  return (
    <div className="container mt-5">
      {/* <h1 className="text-center">Quản lý môn học</h1> */}
      {/* <SubjectManager /> */}
      {/* <AddQuestionForm/> */}
      <AccountList/>
      <Route path="/AccountList" element={<Shift />} />
    </div>
  );
}

export default Admin;