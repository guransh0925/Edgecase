import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProblemList from './pages/ProblemList';
import ProblemPage from './pages/ProblemPage';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect empty root path directly to your problems portal dashboard */}
        <Route path="/" element={<Navigate to="/problems" replace />} />
        
        {/* Core Catalog View [cite: 80] */}
        <Route path="/problems" element={<ProblemList />} />
        
        {/* Dynamic Parameterized Workspace (Matches /problems/1, /problems/2, etc.) [cite: 80] */}
        <Route path="/problems/:id" element={<ProblemPage />} />
        
        {/* Authentication Routes  */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;