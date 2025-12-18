import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'


cloudinary.config({
  cloud_name: process.env.CLOUDINERY_CLOUD_NAME,
  api_key: process.env.CLOUDINERY_API_KEY,
  api_secret: process.env.CLOUDINERY_SECRET, 
});



