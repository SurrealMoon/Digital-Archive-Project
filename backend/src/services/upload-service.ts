import AWS from "aws-sdk";
import { ManagedUpload } from "aws-sdk/clients/s3";
import dotenv from "dotenv";

dotenv.config();

class FileService {
  private s3: AWS.S3;
  private BUCKET_NAME: string;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AMAZON_ACCESS_KEY,
      secretAccessKey: process.env.AMAZON_SECRET_KEY,
      region: process.env.AMAZON_BUCKET_REGION,
    });
    this.BUCKET_NAME = process.env.AMAZON_BUCKET_NAME!;
  }

  async uploadFile(file: Express.Multer.File): Promise<ManagedUpload.SendData> {
    try {
      if (!this.BUCKET_NAME) {
        throw new Error('Bucket name is not defined in the environment variables');
      }
  
      const params = {
        Bucket: this.BUCKET_NAME, // Bucket adı çevre değişkeninden alınıyor
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
  
      console.log('Uploading file with params:', params); // Debugging için log ekleyin
  
      return this.s3.upload(params).promise();
    } catch (error) {
      console.error('S3 upload error:', error); // Hata detaylarını loglayın
      throw new Error('File upload failed');
    }
  }
  
  

  async getFile(key: string): Promise<AWS.S3.GetObjectOutput> {
    const params = {
      Bucket: this.BUCKET_NAME,
      Key: key,
    };

    return this.s3.getObject(params).promise();
  }

  async listFiles(): Promise<AWS.S3.ListObjectsV2Output> {
    const params = {
      Bucket: this.BUCKET_NAME,
    };

    return this.s3.listObjectsV2(params).promise();
  }

  async getFilesByIds(ids: string[]): Promise<AWS.S3.GetObjectOutput[]> {
    const promises = ids.map((id) => this.getFile(id));
    return Promise.all(promises);
  }

  async convertToFileFormat(ids: string[]): Promise<Express.Multer.File[]> {
    const filesData = await this.getFilesByIds(ids);

    return filesData.map((fileData, index) => ({
      fieldname: "",
      originalname: ids[index],
      encoding: "7bit",
      mimetype: fileData.ContentType || "",
      buffer: fileData.Body as Buffer,
      size: fileData.ContentLength || 0,
      destination: "",
      filename: "",
      path: "",
      stream: null as any,
    }));
  }
}

export default new FileService();