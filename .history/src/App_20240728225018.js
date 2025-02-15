import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Admin from './components/Admin';
import Shift from './components/Shift';
import Schedule from './components/Schedule';
import Result from './components/Result';
import Contact from './components/Contact';
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated';
import { Role } from './roles';
import Header from './components/Header';
import AdminHeader from './components/AdminHeader';
import Footer from './components/Footer';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ConditionalHeader />
        <div className='page-wrapper'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shift" element={<Shift />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/result" element={<Result />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/login"
              element={
                <RedirectIfAuthenticated>
                  <Login />
                </RedirectIfAuthenticated>
              }
            />
            <Route
              path="/register"
              element={
                <RedirectIfAuthenticated>
                  <Register />
                </RedirectIfAuthenticated>
              }
            />
            <Route element={<ProtectedRoute allowedRoles={[Role.Admin]} />}>
              <Route path="/admin/*" element={<Admin />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={['admin', 'user']} />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

const ConditionalHeader = () => {
  const { getUserRole } = useAuth();
  const role = getUserRole();

  if (role === Role.Admin) {
    return <AdminHeader />;
  }

  return <Header />;
};

export default App;
