import mongoose from 'mongoose';
import { DB_NAME } from './constent.js';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';

dotenv.config({
  path: './env',
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 9000, () => {});
  })
  .catch((err) => {
    console.log('MongoDB Connection Faild From Index.js Root', err);
  });


// connectDB().then(() => {
//   console.log('d');
// });
