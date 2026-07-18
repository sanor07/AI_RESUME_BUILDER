import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage.jsx';
import BuilderPage from './pages/BuilderPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/builder" element={<BuilderPage />} />
    </Routes>
  );
}