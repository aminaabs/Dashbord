const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load env
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middleware
app.use(express.json());

const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'API is running' });
});

// DB and server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.DB_URI;

if (!MONGO_URI) {
  // eslint-disable-next-line no-console
  console.warn('Warning: MONGO_URI is not set. Please configure your environment.');
}

async function start() {
  try {
    if (MONGO_URI) {
      await mongoose.connect(MONGO_URI, {
        // useNewUrlParser and useUnifiedTopology are default in Mongoose 6+
      });
      // eslint-disable-next-line no-console
      console.log('Connected to MongoDB');
    }

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
