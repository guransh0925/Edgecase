const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Import bcrypt for hashing passwords
const prisma = require('./db/prisma'); // Import our database connection
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Base Route Check
app.get('/', (req, res) => {
  res.json({ message: "EdgeCase Backend is up and running!" });
});

// ==========================================
// AUTHENTICATION ROUTES
// ==========================================

// POST /auth/register - Create a new user account
app.post('/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Basic validation: ensure all fields were sent
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing username, email, or password" });
    }

    // 2. Check if user already exists with this email or username
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { username: username }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: "Username or Email already registered" });
    }

    // 3. Hash the plain text password for safety (10 salt rounds)
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 4. Save the user into our SQLite database
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash, // Save the hashed version, not the plain text!
        role: "user"  // Defaults to a normal user
      }
    });

    // 5. Respond with success (Do NOT return the passwordHash back to the user!)
    res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong during registration" });
  }
});

// POST /auth/login - Verify user credentials and return a JWT Token
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: "Missing email or password" });
    }

    // 2. Find the user by email in the database
    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    // 3. If user doesn't exist, return a generic error (for security, don't say "email not found")
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 4. Compare the incoming password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 5. Credentials match! Generate a secure JWT token
    // We store the userId and role inside the token payload
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' } // Token expires in 1 day
    );

    // 6. Return the token and basic user info to the frontend
    res.json({
      message: "Login successful!",
      token: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong during login" });
  }
});

// ==========================================
// PROBLEM ROUTES
// ==========================================

// GET /problems - Fetch all problems
app.get('/problems', async (req, res) => {
  try {
    const problems = await prisma.problem.findMany({
      select: { id: true, title: true, timeLimitMs: true, memLimitMb: true }
    });
    res.json(problems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch problems" });
  }
});

// GET /problems/:id - Fetch a single problem
app.get('/problems/:id', async (req, res) => {
  try {
    const problemId = parseInt(req.params.id);
    const problem = await prisma.problem.findUnique({
      where: { id: problemId },
      include: {
        testCases: { where: { isHidden: false } }
      }
    });
    if (!problem) return res.status(404).json({ error: "Problem not found" });
    res.json(problem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch problem details" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running smoothly on http://localhost:${PORT}`);
});