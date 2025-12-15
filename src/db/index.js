import mongoose from 'mongoose';
import { DB_NAME } from '../constains';

export const connectDB = async () => {
  try {
    const connectionResponse = await mongoose.connect(
      `${process.env.MONGO_DB_URL}/${DB_NAME}`
    );
    console.log(`Connected to MongoDB database: ${DB_NAME}`);
    console.log(`connnected ${connectionResponse.Connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
