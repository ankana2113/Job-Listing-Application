const mongoose = require('mongoose');
require('dotenv/config');

async function testConnection() {
    const uri = process.env.MONGODB_URI;
  
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in the environment variables.');
    }
  
    try {
      await mongoose.connect(uri);
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('Error connecting to MongoDB Atlas:', error);
    }
  }
  
  testConnection();
