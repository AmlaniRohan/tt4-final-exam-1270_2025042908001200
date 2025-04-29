import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TravelEntryList from './components/TravelEntryList';
import TravelEntryForm from './components/TravelEntryForm';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h1>Travel Journal</h1>
        <Routes>
          <Route path="/" element={<TravelEntryList />} />
          <Route path="/add" element={<TravelEntryForm />} />
          <Route path="/edit/:id" element={<TravelEntryForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
