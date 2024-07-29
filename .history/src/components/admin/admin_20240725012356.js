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
      <Router>
      <Header />
      
      <Routes></Routes>
      <Route path="/AccountList" element={<AccountList />} />
    </div>
  );
}

export default Admin;