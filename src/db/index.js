import mongoose from 'mongoose';
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017');
    console.log('MONGODBB Connect From DB?index.js');
  } catch (error) {
    console.log('MONGODB Not Connection Faild!!! From DB/index.js');
  }
};

export default connectDB;
