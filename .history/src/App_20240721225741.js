// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Home from './Home';
im

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/profile" component={Profile} />
          <Route path="/" exact component={Home} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
