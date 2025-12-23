import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResponse {
  public_id: string;
  url: string;
  secure_url: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
}

export async function uploadToCloudinary(
  fileBuffer: Buffer,
  filename: string
): Promise<UploadResponse> {
  return new Promise((resolve, reject) => {
    const sanitizedFilename = filename
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_");
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        public_id: sanitizedFilename,
        overwrite: false,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve({
            public_id: result.public_id,
            url: result.url,
            secure_url: result.secure_url,
            width: result.width || 0,
            height: result.height || 0,
            bytes: result.bytes || 0,
            format: result.format || "",
          });
        }
      }
    );

    stream.end(fileBuffer);
  });
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
