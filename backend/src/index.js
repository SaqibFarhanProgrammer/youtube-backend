import mongoose from 'mongoose';
import { DB_NAME } from './constent.js';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';
import { UploadOnCloudinery } from './utils/cloudinery.js';

dotenv.config({
  path: './.env',
});

function ajasd (params) {
  logger.info('asdasd');
    
}

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {});
  })
  .catch((err) => {
    console.log('MongoDB Connection Faild From Index.js Root', err);
  });

UploadOnCloudinery();
// connectDB().then(() => {
//   console.log('d');
// });
