import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Allotment } from 'allotment'
import Editor from '@monaco-editor/react'
import Markdown from 'react-markdown'
import 'allotment/dist/style.css' // Crucial layout styles for splitting panels!

// Temporary mock problems dictionary to simulate database queries for Week 2
const dummyProblemsData = {
  1: {
    title: "Two Sum",
    description: "# Problem 1: Two Sum\nGiven an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\n### Constraints:\n* `2 <= nums.length <= 10^4`"
  },
  2: {
    title: "Reverse String",
    description: "# Problem 2: Reverse String\nWrite a function that reverses a string. The input string is given as an array of characters `s`.\n\n### Constraints:\n* `1 <= s.length <= 10^5`"
  },
  3: {
    title: "Longest Palindromic Substring",
    description: "# Problem 3: Longest Palindromic Substring\nGiven a string `s`, return the longest palindromic substring in `s`.\n\n### Constraints:\n* `1 <= s.length <= 1000`"
  }
}

function ProblemPage() {
  // 1. Extract the dynamic ':id' parameter out of the browser URL path
  const { id } = useParams()
  
  // Fetch matching problem details from our dictionary, or fall back if not found
  const currentProblem = dummyProblemsData[id] || { 
    title: "Unknown Problem", 
    description: "The requested problem statement could not be found." 
  }

  // 2. Local reactive states for code editor workspace operations
  const [verdict, setVerdict] = useState("NONE")
  const [language, setLanguage] = useState("cpp")
  const [code, setCode] = useState(`// Write your solution for ${currentProblem.title} here...`)

  const handleEditorChange = (value) => {
    setCode(value)
  }

  const handleFakeSubmit = () => {
    setVerdict("PENDING...")
    setTimeout(() => {
      const mockVerdicts = ["ACCEPTED (AC)", "WRONG ANSWER (WA)", "TIME LIMIT EXCEEDED (TLE)"]
      setVerdict(mockVerdicts[Math.floor(Math.random() * mockVerdicts.length)])
    }, 2000)
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#1e1e1e', color: '#fff' }}>
      
      {/* Top Navigation Control Bar Layout */}
      <div style={{ padding: '10px 20px', background: '#252526', borderBottom: '1px solid #3c3c3c', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/problems" style={{ color: '#58a6ff', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
            ← Back to Catalog
          </Link>
          <h2 style={{ margin: 0, fontSize: '18px' }}>EdgeCase IDE — Problem #{id}</h2>
        </div>
        <div>
          <label style={{ marginRight: '8px', fontSize: '14px' }}>Language: </label>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            style={{ background: '#3c3c3c', color: '#fff', border: '1px solid #555', padding: '4px 8px', cursor: 'pointer' }}
          >
            <option value="cpp">C++</option>
            <option value="python">Python 3</option>
            <option value="c">C</option>
          </select>
        </div>
      </div>

      {/* Main Draggable Workspace Split View */}
      <div style={{ flexGrow: 1, position: 'relative' }}>
        <Allotment>
          
          {/* Left Pane: Markdown Content Document Screen */}
          <Allotment.Pane minSize={200}>
            <div style={{ padding: '20px', height: '100%', overflowY: 'auto', boxSizing: 'border-box' }}>
              <Markdown>{currentProblem.description}</Markdown>
            </div>
          </Allotment.Pane>

          {/* Right Pane: Code Editor + Logs Status Output Panel */}
          <Allotment.Pane minSize={300}>
            <Allotment vertical>
              
              {/* Top half: Monaco Code Editor Workspace */}
              <Allotment.Pane minSize={150}>
                <div style={{ height: '100%', paddingTop: '10px' }}>
                  <Editor
                    height="100%"
                    theme="vs-dark"
                    language={language === 'cpp' ? 'cpp' : language}
                    value={code}
                    onChange={handleEditorChange}
                    options={{ automaticLayout: true, fontSize: 14 }}
                  />
                </div>
              </Allotment.Pane>

              {/* Bottom half: Action Execution Controls & Verdict Logs Screen */}
              <Allotment.Pane preferredSize="25%">
                <div style={{ padding: '15px', background: '#252526', height: '100%', boxSizing: 'border-box', borderTop: '1px solid #3c3c3c' }}>
                  <button 
                    onClick={handleFakeSubmit}
                    style={{ padding: '8px 16px', backgroundColor: '#0e639c', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginBottom: '10px' }}
                  >
                    Submit Code
                  </button>
                  <div style={{ marginTop: '5px' }}>
                    <strong>Status: </strong>
                    <span style={{ 
                      color: verdict.includes("AC") ? '#4caf50' : verdict.includes("PENDING") ? '#ffeb3b' : '#f44336',
                      fontWeight: 'bold' 
                    }}>
                      {verdict}
                    </span>
                  </div>
                </div>
              </Allotment.Pane>

            </Allotment>
          </Allotment.Pane>

        </Allotment>
      </div>
    </div>
  )
}

export default ProblemPage