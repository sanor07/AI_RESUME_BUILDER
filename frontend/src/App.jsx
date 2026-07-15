import { Routes, Route } from 'react-router-dom';
import BuilderPage from './pages/BuilderPage.jsx';

// Route structure kept intentionally flat for now — this is a single-page
// builder app. Additional routes (e.g. /ats-check, /job-match as standalone
// pages) can be added here in later phases without touching ResumeContext.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BuilderPage />} />
    </Routes>
  );
}
