import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import SelfServePage from './pages/SelfServePage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/self-serve" element={<SelfServePage />} />
    </Routes>
  </Router>
);

export default App;