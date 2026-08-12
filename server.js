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
    /\.vercel\.app$/,
  ],
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/content', require('./routes/content'));

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI ? process.env.MONGO_URI.trim().replace(/^["']|["']$/g, '') : '';

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  
  // Database Connection after server is running
  if (!MONGO_URI) {
    console.warn('⚠️  MONGO_URI is not defined in environment! Database is not connected.');
  } else {
    mongoose.connect(MONGO_URI)
      .then(() => {
        console.log('✅ Connected to MongoDB');
      })
      .catch((err) => {
        console.error('❌ MongoDB Connection Error:', err);
      });
  }
});
