import mongoose from 'mongoose';
import { DB_NAME } from './constants';
import express from 'express';
const app = express();
(async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(`${process.env.MONGO_DB_URL}/${DB_NAME}`);
    
    app.once('error', (error) => {
      console.log(`Connected to MongoDB database: ${DB_NAME}`);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
        // Your additional server setup code can go here
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
})();
