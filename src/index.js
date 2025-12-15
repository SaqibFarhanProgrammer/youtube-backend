import mongoose from 'mongoose';
import { DB_NAME } from './constains';
import express from 'express';
import connectDB from './db';



connectDB()



(async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_DB_URL}/${DB_NAME}`);

    app.once('error', (error) => {
      console.log(`Connected to MongoDB database: ${DB_NAME}`);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
})();
