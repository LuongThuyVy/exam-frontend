import React from 'react';
import SubjectManager from './components/SubjectManager';

function Admin() {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Quản lý môn học</h1>
      <SubjectManager />
    </div>
  );
}

export default Admin;