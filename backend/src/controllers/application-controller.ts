import { RequestHandler, Request, Response, NextFunction } from 'express';
import {
  createApplicationService,
  getAllApplicationsService,
  getApplicationByIdService,
  updateApplicationService,
  deleteApplicationService,
  assignLawyerService,
  addViolationService,
  addDocumentToApplication,
  removeDocumentFromApplication,
} from "../services/application-service";
import FileService from '../services/upload-service';

interface MulterRequest extends Request {
  file?: Express.Multer.File & { location?: string };
}


// Yeni Başvuru Oluşturma
export const createApplication: RequestHandler = async (req, res, next) => {
  try {
    const application = await createApplicationService(req.body);
    res.status(201).json(application); // Burada açıkça bir JSON yanıt dönüyoruz.
    return; // TypeScript'e fonksiyonun sonlandığını belirtmek için return ekliyoruz.
  } catch (error) {
    next(error);
  }
};

// Tüm Başvuruları Listeleme
export const getAllApplications: RequestHandler = async (req, res, next) => {
  try {
    const applications = await getAllApplicationsService();
    res.status(200).json(applications); // Yanıt döndürüyoruz.
    return; // Fonksiyonun sonlandığını belirtmek için return ekliyoruz.
  } catch (error) {
    next(error);
  }
};

// Belirli Bir Başvuru Getirme
export const getApplicationById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const application = await getApplicationByIdService(id);

    if (!application) {
      res.status(404).json({ message: "Application not found" });
      return; // Fonksiyonun sonlandığını belirtmek için return ekliyoruz.
    }

    res.status(200).json(application);
    return;
  } catch (error) {
    next(error);
  }
};

// Başvuru Güncelleme
export const updateApplication: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedApplication = await updateApplicationService(id, req.body);

    if (!updatedApplication) {
      res.status(404).json({ message: "Application not found" });
      return;
    }

    res.status(200).json(updatedApplication);
    return;
  } catch (error) {
    next(error);
  }
};

// Başvuru Silme
export const deleteApplication: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedApplication = await deleteApplicationService(id);

    if (!deletedApplication) {
      res.status(404).json({ message: "Application not found" });
      return;
    }

    res.status(200).json({ message: "Application deleted successfully" });
    return;
  } catch (error) {
    next(error);
  }
};

// Avukat Atama ve Dava Oluşturma
export const assignLawyer: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params; // Başvuru ID
    const { lawyerId } = req.body; // Avukat ID (frontend'den gelen)

    // Eğer lawyerId veya id eksikse hata döndür
    if (!id || !lawyerId) {
      res.status(400).json({ message: "Application ID and Lawyer ID are required" });
      return;
    }

    // Servis fonksiyonuna yönlendir
    const updatedApplication = await assignLawyerService(id, lawyerId);

    if (!updatedApplication) {
      res.status(404).json({ message: "Application not found" });
      return;
    }

    // Güncellenmiş başvuru döndür
    res.status(200).json({
      message: "Lawyer assigned successfully",
      application: updatedApplication,
    });
  } catch (error) {
    console.error("Error assigning lawyer:", error);
    next(error); // Hata işleme middleware'ine gönder
  }
};

// Hak İhlali Ekleme
export const addViolation: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params; // Başvuru ID'si
    const { violationId } = req.body; // Gövdeden gelen violationId

    const updatedApplication = await addViolationService(id, violationId);

    if (!updatedApplication) {
      res.status(404).json({ message: "Application not found" });
      return;
    }

    res.status(200).json(updatedApplication); // Güncellenmiş kaydı döndür
    return;
  } catch (error) {
    next(error);
  }
};


export const addDocumentController = async (
  req: MulterRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    
    const { id } = req.params;
    const { documentTitle } = req.body;

    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    // AWS S3'e dosya yükle
    let fileUrl: string;
    try {
      const uploadResult = await FileService.uploadFile(req.file);
      fileUrl = uploadResult.Location;
    } catch (error) {
      console.error("S3 upload error:", error);
      res.status(500).json({ message: 'File upload failed', error });
      return;
    }

    // Dosyayı başvuruya ekle
    const updatedApplication = await addDocumentToApplication(id, fileUrl, documentTitle);

    if (!updatedApplication) {
      res.status(404).json({ message: 'Application not found' });
      return;
    }

    res.status(200).json({ message: 'Document added successfully', updatedApplication });
  } catch (error) {
    next(error);
  }
};


export const removeDocumentController = async (
  req: Request<{ id: string; index: string }, {}, {}, {}>, // Parametreler doğru şekilde tipli
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id, index } = req.params; // Parametrelerden alınan applicationId ve documentIndex
    const applicationId = id;
    const documentIndex = parseInt(index); // Silinecek belgenin indeksini al

    // Silme işlemi için service fonksiyonunu çağır
    const updatedApplication = await removeDocumentFromApplication(applicationId, documentIndex);

    // Başvuruyu güncelledikten sonra başarılı bir yanıt döndür
    res.status(200).json(updatedApplication); // Güncellenmiş başvuru döndürülür
  } catch (error) {
    next(error); // Hata varsa error handler'a yönlendir
  }
};