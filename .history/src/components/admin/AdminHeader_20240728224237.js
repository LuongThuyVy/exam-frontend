import React from 'react';

const AdminHeader = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><a href="/admin">Admin Dashboard</a></li>
          {/* Add more admin-specific links here */}
        </ul>
      </nav>
    </header>
  );
};

export default AdminHeader;
