import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

var cors = require('cors')

App.use(cors()) // Use this after the variable declaration

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  
  <React.StrictMode>
    
    <App />
  </React.StrictMode>
);

