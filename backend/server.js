require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/cars', require('./routes/cars'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/upload', require('./routes/upload'));

// Admin login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin121' && password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true, token: 'admin-authenticated' });
  }
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// Root route — backend live status
app.get('/', (req, res) => {
  res.send("Server running ");
});

// Health check (JSON)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Thakare Tours API running', timestamp: new Date().toISOString() });
});



// MongoDB connection — cached for Vercel serverless (prevents new connection per request)
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB error:', err.message);
    throw err;
  }
}

// Connect on startup (local dev) and attach to requests (Vercel)
connectDB();

// Middleware to ensure DB is connected on every request (for Vercel cold starts)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch {
    res.status(503).json({ error: 'Database unavailable. Please try again.' });
  }
});

// Start server only in local development (not on Vercel)
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 Thakare Tours server running on http://localhost:${PORT}`);
  });
}

// Export for Vercel serverless
module.exports = app;


