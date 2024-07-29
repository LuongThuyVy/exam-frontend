import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <ul>
        <li>
          <NavLink to="/admin/subjects">Subject Manager</NavLink>
        </li>
        <li>
          <NavLink to="/admin/add-question">Add Question</NavLink>
        </li>
        <li>
          <NavLink to="/admin/accounts">Account List</NavLink>
        </li>
        <li>
          <NavLink to="/admin/exam-shifts">Exam Shift List</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
