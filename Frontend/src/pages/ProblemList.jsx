import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProblemList() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

    fetch(`${API_URL}/problems`)
      .then((res) => res.json())
      .then((data) => {
        setProblems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Database connection error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ color: '#fff', padding: '40px', backgroundColor: '#1e1e1e', minHeight: '100vh' }}>Fetching problem catalog...</div>;

  return (
    <div style={{ padding: '40px', backgroundColor: '#1e1e1e', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Problem Catalog</h1>
      
      {problems.length === 0 ? (
        <p style={{ color: '#aaa' }}>No problems found in the database. Add some via Prisma Studio!</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {problems.map((prob) => (
            <li key={prob.id} style={{ margin: '15px 0', padding: '15px', backgroundColor: '#2d2d2d', borderRadius: '6px', border: '1px solid #444' }}>
              <Link to={`/problems/${prob.id}`} style={{ color: '#61dafb', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold', display: 'block' }}>
                {prob.title} →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProblemList;