import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './components/Pages/HomePage';

function App() {
  return (
    <Router>
      <HomePage />
    </Router>
  );
}

export default App;
