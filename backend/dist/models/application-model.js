"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Başvuru Şeması
const ApplicationSchema = new mongoose_1.Schema({
    citizenId: { type: String, required: true, unique: true }, // TC Kimlik numarası
    fullName: { type: String, required: true }, // Ad ve soyad
    phone: { type: String, required: true }, // Telefon numarası
    email: { type: String, required: true }, // E-posta adresi
    address: { type: String }, // Adres
    applicationDate: { type: Date, required: true, default: Date.now }, // Başvuru tarihi
    violationType: { type: String, required: true }, // Vatandaşın yazdığı olay türü
    violationId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Violation" }, // Hak İhlali Şeması referansı
    eventSummary: { type: String, required: true }, // Olay özeti
    eventDetails: { type: String, required: true }, // Olay detayları
    documentTitle: { type: String }, // Döküman başlığı
    documents: { type: [String] }, // Dökümanlar (dosya yolları)
    processedBy: { type: String }, // İşlem yapan baro personelinin adı
    lawyerId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }, // Atanan avukat referansı
}, { timestamps: true } // createdAt ve updatedAt otomatik eklenir
);
// Model
const Application = mongoose_1.default.model("Application", ApplicationSchema);
exports.default = Application;
//# sourceMappingURL=application-model.js.map