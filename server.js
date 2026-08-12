const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://website-rkk.vercel.app',
    'https://bemprkk-unj.vercel.app',
    'https://admin-website-bemprkk.vercel.app',
    /\.vercel\.app$/,
  ],
  credentials: true,
}));
app.use(express.json());

// Database Connection Manager for Serverless & Local
const MONGO_URI = process.env.MONGO_URI ? process.env.MONGO_URI.trim().replace(/^["']|["']$/g, '') : '';
let isConnected = false;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }
  if (!MONGO_URI) {
    console.warn('⚠️ MONGO_URI is not defined in environment!');
    return;
  }
  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
  }
};

// Ensure DB is connected before handling any request
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Healthcheck Route
app.get('/', (req, res) => {
  res.send('BEMPRKK Backend API is running!');
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/content', require('./routes/content'));
app.use('/api/backup', require('./routes/backup'));

// Start Server locally if run directly
const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running locally on port ${PORT}`);
  });
}

module.exports = app;
