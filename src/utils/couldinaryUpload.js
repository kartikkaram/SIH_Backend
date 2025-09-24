import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
cloudinary.config({
  secure: true
});

console.log(cloudinary.config());


export const uploadToCloudinary=async (filePath)=>{
   try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "video",
      folder:"SIH_PROJECT",
    });
    fs.unlinkSync(filePath);

    return result
  } catch (err) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    throw err;
  }
}