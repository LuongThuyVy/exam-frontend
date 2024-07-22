import './App.css';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

import {  BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Shift from './components/Shift/Shift';
import Schedule from './components/Schedule/Schedule';
import Result from './components/Result/Result';
import Contact from './components/Contact/Contact';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';

import {AuthProvider } from '../src/contexts/AuthContext';
import ProtectedRoute from '../src/contexts/ProtectedRoute';

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
        <Header />
        <Switch>
          <Route path="/" element={<Home />} />
          <Route path="/shift" element={<Shift />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/result" element={<Result />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <ProtectedRoute path="/profile" component={Profile} allowedRoles={['admin', 'user']} />
          <Route path="*" element={<NotFound />} />
          </Switch>
      </Router>
    </AuthProvider>
  );
}


export default App;
