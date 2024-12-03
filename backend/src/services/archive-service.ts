import Archive from "../models/archive-model"; // Şemayı import edin
import mongoose from "mongoose";

// Yeni bir olay ekleme (Create)
export const createArchiveService = async (data: any) => {
  const newArchive = new Archive(data);
  return await newArchive.save();
};

// Tüm olayları veya kategorilere göre listeleme (Read)
export const getArchivesService = async (type?: string) => {
  const query = type ? { type } : {};
  return await Archive.find(query);
};

// Belirli bir olayı ID'ye göre getirme
export const getArchiveByIdService = async (id: string) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new Error("Invalid ID format");
  }
  return await Archive.findById(id);
};

// Olay güncelleme (Update)
export const updateArchiveService = async (id: string, data: any) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new Error("Invalid ID format");
  }
  return await Archive.findByIdAndUpdate(id, data, { new: true });
};

// Olay silme (Delete)
export const deleteArchiveService = async (id: string) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new Error("Invalid ID format");
  }
  return await Archive.findByIdAndDelete(id);
};
