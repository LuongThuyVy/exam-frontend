import React from 'react';
import SubjectManager from './SubjectManager';
import AddQuestionForm from './AddQuestionForm';
import AccountList from './AccountList';
import ExamShiftList from './ExamShiftList';

const Admin(){
  <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute allowedRoles={[Role.Admin]} />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
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