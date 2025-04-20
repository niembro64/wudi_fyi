import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Layout
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import SeasonPage from './pages/seasons/SeasonPage';
import LeaguePage from './pages/seasons/LeaguePage';

// Not Found Page
const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Home page */}
          <Route index element={<HomePage />} />
          
          {/* Hierarchical season and league routes */}
          <Route path="seasons">
            {/* Season listing (e.g., /seasons/spring) */}
            <Route path=":season" element={<SeasonPage />} />
            
            {/* League listing (e.g., /seasons/spring/womens) */}
            <Route path=":season/:leagueType" element={<LeaguePage />} />
            
            {/* Specific year (e.g., /seasons/spring/womens/2025) */}
            <Route path=":season/:leagueType/:year" element={<LeaguePage />} />
          </Route>
          
          {/* Not found route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;