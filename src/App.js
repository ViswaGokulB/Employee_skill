import React from 'react';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
