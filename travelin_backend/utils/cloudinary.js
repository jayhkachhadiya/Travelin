import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: 926777378827254,
  api_secret: process.env.CLOUDINARY_SECRATE,
});

// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) return null
//         const response = await cloudinary.uploader.upload (localFilePath, {
//             resource_type: "auto"
//         })
//         console.log("file is uploading in coudinary", response.url)
//         return response
//     } catch (error) {
//         fs.unlinkSync(localFilePath);
//         console.log('Error while uploading file ', error);
//         return null;
//     }
// }

// const uploadOnCloudinary = async (fileData) => {
//   console.log(fileData, "fileDatafileData");
//   try {
//     if (!fileData) {
//       throw new Error("Invalid file data");
//     }
//     const uploadStream = cloudinary.uploader.upload_stream(
//       {
//         resource_type: "auto",
//       },
//       (error, result) => {
//         if (error) {
//           console.error(error);
//           throw new Error("Error uploading to Cloudinary");
//         } else {
//           console.log("file is uploading in coudinary");
//           console.log(result);
//           resolve(result);
//         }
//       }
//     );
//     streamifier.createReadStream(fileData.buffer).pipe(uploadStream);
//   } catch (error) {
//     console.error(error);
//     throw new Error("Something went wrong");
//   }
// };

const uploadOnCloudinary = (fileData) => {
  return new Promise((resolve, reject) => {
    console.log(fileData, "fileDatafileData");
    try {
      if (!fileData) {
        throw new Error("Invalid file data");
      }
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            console.error(error);
            reject(new Error("Error uploading to Cloudinary"));
          } else {
            console.log("file is uploading in coudinary");
            console.log(result);
            resolve(result);
          }
        }
      );
      streamifier.createReadStream(fileData.buffer).pipe(uploadStream);
    } catch (error) {
      console.error(error);
      reject(new Error("Something went wrong"));
    }
  });
};
export default uploadOnCloudinary;
// try {
//     if (!localFilePath) return null
//     const response = await cloudinary.uploader.upload_stream ({resource_type: "auto"})
//     console.log("file is uploading in coudinary", response)
//     streamifier.createReadStream(localFilePath.buffer).pipe(response)
//     return response
// } catch (error) {
//     fs.unlinkSync(localFilePath);
// console.log('Error while uploading file ', error);
// return null;
// }
