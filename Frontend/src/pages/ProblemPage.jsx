import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Allotment } from 'allotment';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import 'allotment/dist/style.css'; // Vital for split-panes styling

function ProblemPage() {
  const { id } = useParams(); 
  const [problemData, setProblemData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Workspace UI States
  const [code, setCode] = useState('// Write your code here...\n');
  const [language, setLanguage] = useState('cpp');
  const [verdict, setVerdict] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

    fetch(`${API_URL}/problems/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProblemData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch problem data:", err);
        setLoading(false);
      });
  }, [id]);

  // Handle Code Submissions (Week 3 Flow Configuration)
  const handleSubmitCode = async () => {
    setSubmitting(true);
    setVerdict("PENDING...");
    
    // Mock response for now as required by Week 2 goals
    setTimeout(() => {
      setVerdict("ACCEPTED (Mock Validation)");
      setSubmitting(false);
    }, 2000);
  };

  if (loading) return <div style={{ color: '#fff', padding: '40px', backgroundColor: '#1e1e1e', minHeight: '100vh' }}>Loading workspace components...</div>;
  if (!problemData) return <div style={{ color: '#fff', padding: '40px', backgroundColor: '#1e1e1e', minHeight: '100vh' }}>Problem details could not be found.</div>;

  return (
    <div style={{ height: '100vh', backgroundColor: '#1e1e1e', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Header Navigation Strip */}
      <div style={{ padding: '10px 20px', backgroundColor: '#2d2d2d', borderBottom: '1px solid #444', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '20px' }}>{problemData.title}</h2>
        
        <div>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            style={{ padding: '6px 12px', marginRight: '15px', backgroundColor: '#1e1e1e', color: '#fff', border: '1px solid #555', borderRadius: '4px' }}
          >
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="python">Python</option>
          </select>
          
          <button 
            onClick={handleSubmitCode}
            disabled={submitting}
            style={{ padding: '6px 16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: submitting ? 'not-allowed' : 'pointer' }}
          >
            {submitting ? 'Submitting...' : 'Submit Code'}
          </button>
        </div>
      </div>

      {/* Main Resizable Workspace Area */}
      <div style={{ flex: 1, position: 'relative' }}>
        <Allotment>
          
          {/* Left Panel: Markdown Problem Description */}
          <Allotment.Pane minSize={300}>
            <div style={{ padding: '20px', overflowY: 'auto', height: '100%', boxSizing: 'border-box', borderRight: '2px solid #333' }}>
              <ReactMarkdown>{problemData.description}</ReactMarkdown>
            </div>
          </Allotment.Pane>

          {/* Right Panel: Split between Editor and Verdict Panel */}
          <Allotment.Pane minSize={400}>
            <Allotment vertical>
              
              {/* Upper Section: Monaco Code Input Box */}
              <Allotment.Pane minSize={200}>
                <div style={{ height: '100%' }}>
                  <Editor
                    height="100%"
                    theme="vs-dark"
                    language={language === 'python' ? 'python' : 'cpp'}
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    options={{ fontSize: 14, automaticLayout: true }}
                  />
                </div>
              </Allotment.Pane>

              {/* Lower Section: Real-time Verdict Output Terminal */}
              <Allotment.Pane minSize={150}>
                <div style={{ padding: '20px', backgroundColor: '#141414', height: '100%', borderTop: '2px solid #333', boxSizing: 'border-box' }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#aaa', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px' }}>Console Verdict Output</h4>
                  {verdict ? (
                    <div style={{ padding: '12px', borderRadius: '4px', backgroundColor: verdict.includes('ACCEPTED') ? '#1b4332' : '#2d2d2d', color: verdict.includes('ACCEPTED') ? '#52b788' : '#61dafb', fontWeight: 'bold', border: '1px solid #333' }}>
                      {verdict}
                    </div>
                  ) : (
                    <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>Run your script to capture structural compiler execution parameters...</p>
                  )}
                </div>
              </Allotment.Pane>

            </Allotment>
          </Allotment.Pane>

        </Allotment>
      </div>

    </div>
  );
}

export default ProblemPage;