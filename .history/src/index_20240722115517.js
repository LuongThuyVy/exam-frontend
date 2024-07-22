import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet">

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

