import { Link } from 'react-router-dom';

function ProblemList() {
  // Hardcoded fake problems for Week 2 [cite: 72, 86]
  const dummyProblems = [
    { id: 1, title: "Two Sum", difficulty: "Easy" },
    { id: 2, title: "Reverse String", difficulty: "Easy" },
    { id: 3, title: "Longest Palindromic Substring", difficulty: "Medium" }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: '#1e1e1e', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1>Problem Catalog</h1>
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <Link to="/login" style={{ color: '#0e639c' }}>Login</Link> | 
        <Link to="/register" style={{ color: '#0e639c' }}>Register</Link>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid #3c3c3c' }}>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>Title</th>
            <th style={{ padding: '10px' }}>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {dummyProblems.map(prob => (
            <tr key={prob.id} style={{ borderBottom: '1px solid #2d2d2d' }}>
              <td style={{ padding: '10px' }}>{prob.id}</td>
              <td style={{ padding: '10px' }}>
                {/* Dynamically link to the specific problem workspace ID [cite: 80] */}
                <Link to={`/problems/${prob.id}`} style={{ color: '#58a6ff', textDecoration: 'none', fontWeight: 'bold' }}>
                  {prob.title}
                </Link>
              </td>
              <td style={{ padding: '10px', color: prob.difficulty === 'Easy' ? '#4caf50' : '#ff9800' }}>{prob.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProblemList;