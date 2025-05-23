import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Layout
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import LeaguePage from './pages/LeaguePage';
import GamePage from './pages/GamePage';

// Not Found Page
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold text-gray-dark mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray mb-8">The page you are looking for does not exist.</p>
      <Link to="/" className="btn">Return to Home</Link>
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

          {/* League page (schedules) */}
          <Route path="/leagues/:leagueType" element={<LeaguePage />} />

          {/* Game page */}
          <Route path="/games/:gameId" element={<GamePage />} />

          {/* Not found route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;