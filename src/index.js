const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.send('LogX Server is running! Environment is ' + process.env.NODE_ENV);
});

// Log some startup info
console.log('Starting server...');
console.log('Node environment:', process.env.NODE_ENV);
console.log('Supabase URL configured:', !!process.env.SUPABASE_URL);
console.log('Supabase Service Key configured:', !!process.env.SUPABASE_SERVICE_KEY);

// Routes
app.use('/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled application error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Not found middleware
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});