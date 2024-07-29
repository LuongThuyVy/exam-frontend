import React from 'react';
import SubjectManager from './SubjectManager';
import AddQuestionForm from './AddQuestionForm';
import AccountList from './AccountList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function Admin() {
  return (
    <div className="container mt-5">
      {/* <h1 className="text-center">Quản lý môn học</h1> */}
      {/* <SubjectManager /> */}
      {/* <AddQuestionForm/> */}
      <AccountList/>
      
      <Header />
      
      <Routes>

      <Route path="/AccountList" element={<AccountList />} />
      </Routes>
      
    </div>
  );
}

export default Admin;