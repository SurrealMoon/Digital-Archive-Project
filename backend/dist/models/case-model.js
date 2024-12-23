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
// Dava Şeması
const CaseSchema = new mongoose_1.Schema({
    applicationId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Application", required: true }, // Application ile bağlantı
    lawyerId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }, // Sistemde kayıtlı bir avukat
    caseTitle: { type: String, required: true },
    investigationNo: { type: String }, // Opsiyonel
    courtName: { type: String, required: true },
    courtFileNo: { type: String, required: true },
    caseDescription: { type: String, required: true },
    documentTitle: { type: String },
    documents: { type: [String] }, // Dökümanları bir dizi olarak tutar
}, { timestamps: true } // createdAt ve updatedAt otomatik olarak eklenir
);
// Model
const Case = mongoose_1.default.model("Case", CaseSchema);
exports.default = Case;
//# sourceMappingURL=case-model.js.map