import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
// cloudinery config
cloudinary.config({
  cloud_name: process.env.CLOUDINERY_CLOUD_NAME,
  api_key: process.env.CLOUDINERY_API_KEY,
  api_secret: process.env.CLOUDINERY_SECRET,
});

// upload file  on cloudinery
async function UploadOnCloudinery(filePath) {
  try {
    if (!filePath) return null;
    const cloudineryresponse = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto',
    });

    console.log(
      'FIle Uploaded On Cloudinery Successfully!! ',
      cloudineryresponse.url
    );

    fs.unlinkSync(filePath);

    return cloudineryresponse;
  } catch (error) {
    fs.unlinkSync(filePath);
    console.log(
      'uplaod faild on cloudinery!! FROM Utils/cloudinery.js ',
      error
    );

    return null;
  }
}

export { UploadOnCloudinery };
