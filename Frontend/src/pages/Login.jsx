import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
    
    // Week 2 Mocking: Directly redirect to catalog dashboard on click
    navigate('/problems');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login to EdgeCase</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com" 
              required 
              style={styles.input}
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              required 
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>Sign In</button>
        </form>

        <p style={styles.footerText}>
          Don't have an account? <Link to="/register" style={styles.link}>Register here</Link>
        </p>
        <p style={styles.footerText}>
          <Link to="/problems" style={styles.link}>← Browse Problems Anonymously</Link>
        </p>
      </div>
    </div>
  );
}

// Quick, clean dark-mode Javascript CSS object styling
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#1e1e1e',
    color: '#fff',
    fontFamily: 'sans-serif'
  },
  card: {
    background: '#252526',
    padding: '40px',
    borderRadius: '6px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
    width: '100%',
    maxWidth: '400px',
    boxSizing: 'border-box'
  },
  title: {
    margin: '0 0 20px 0',
    textAlign: 'center',
    fontSize: '24px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  label: {
    fontSize: '14px',
    color: '#cccccc'
  },
  input: {
    padding: '10px',
    background: '#3c3c3c',
    border: '1px solid #555',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '14px'
  },
  button: {
    padding: '12px',
    backgroundColor: '#0e639c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    marginTop: '10px'
  },
  footerText: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#aaa',
    marginTop: '20px',
    marginBottom: '0px'
  },
  link: {
    color: '#58a6ff',
    textDecoration: 'none'
  }
};

export default Login;