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

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Thakare Tours API running' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_ATLAS_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err.message));

// Start server only in local development (not on Vercel)
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 Thakare Tours server running on http://localhost:${PORT}`);
  });
}

// Export for Vercel serverless
module.exports = app;

