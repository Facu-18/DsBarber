import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config()

// Inicializa Cloudinary con credenciales desde .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY as string,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET as string,
});
 
export default cloudinary