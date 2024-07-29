import './App.css';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Shift from './components/Shift/Shift';
import Schedule from './components/Schedule/Schedule';
import Result from './components/Result/Result';
import Contact from './components/Contact/Contact';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import { Role } from './Role';
import Admin from './components/Admin/Admin';

import { useAuth } from './';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './contexts/ProtectedRoute';
import RedirectIfAuthenticated from './contexts/RedirectIfAuthenticated';

function NotFound() {
  return (
    <div>
      <h2>404 Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}

function App() {
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
              <Route path="/admin" element={<AdminPage />} />
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
    return null;
  }

  return <Header />;
};

export default App;