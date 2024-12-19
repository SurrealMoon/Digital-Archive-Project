import { Request, Response, NextFunction } from 'express';
import { uploadFileToS3 } from '../services/upload-service';
import { addDocumentToApplication } from '../services/application-service';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const addDocumentController = async (
  req: MulterRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileUrl = await uploadFileToS3(req.file); // Servis katmanından çağrı

    const updatedApplication = await addDocumentToApplication(
      req.params.id,
      fileUrl,
      req.body.documentTitle
    );

    if (!updatedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }

    return res.status(200).json({ message: 'File uploaded successfully', fileUrl });
  } catch (error) {
    next(error); // Hata yönetimi
  }
};
