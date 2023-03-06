import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import NavBar from './NavBar';
import HomePage from './HomePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBar />
  </React.StrictMode>
);
