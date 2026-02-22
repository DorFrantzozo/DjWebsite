import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import gigRoutes from './routes/gigRoutes.js';
import authRoutes from './routes/authRoutes.js';
import Admin from './models/Admin.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/gigs', gigRoutes);
app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('DJ Website API is running');
});

// Admin Seed Function
const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.log('Skipping Admin creation: ADMIN_EMAIL or ADMIN_PASSWORD not found in .env');
      return;
    }

    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const admin = new Admin({
        email: adminEmail,
        password: adminPassword,
      });
      await admin.save();
      console.log('Admin user seed successful');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
};

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await seedAdmin();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error('MongoDB connection error:', error));
