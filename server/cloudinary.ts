import { v2 as cloudinary } from "cloudinary";

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.warn("Cloudinary credentials not fully configured. Media upload will not work.");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
  publicId: string;
  url: string;
  secureUrl: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
}

export async function uploadImage(buffer: Buffer, filename: string): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const sanitizedFilename = filename
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_");
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "asthawaani-cms",
        resource_type: "image",
        public_id: sanitizedFilename,
        transformation: [
          { quality: "auto:good", fetch_format: "auto" }
        ]
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve({
            publicId: result.public_id,
            url: result.url,
            secureUrl: result.secure_url,
            format: result.format,
            width: result.width,
            height: result.height,
            bytes: result.bytes,
          });
        } else {
          reject(new Error("Upload failed with no result"));
        }
      }
    );
    uploadStream.end(buffer);
  });
}

export async function deleteImage(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === "ok";
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    return false;
  }
}

export function getOptimizedUrl(publicId: string, options?: { width?: number; height?: number }): string {
  return cloudinary.url(publicId, {
    secure: true,
    quality: "auto",
    fetch_format: "auto",
    ...(options?.width && { width: options.width }),
    ...(options?.height && { height: options.height }),
    crop: options?.width || options?.height ? "fill" : undefined,
  });
}

export { cloudinary };
