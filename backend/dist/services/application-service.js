"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addViolationService = exports.assignLawyerService = exports.deleteApplicationService = exports.updateApplicationService = exports.getApplicationByIdService = exports.getAllApplicationsService = exports.createApplicationService = void 0;
const application_model_1 = __importDefault(require("../models/application-model"));
// Yeni Başvuru Oluşturma
const createApplicationService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const application = new application_model_1.default(data);
    return yield application.save();
});
exports.createApplicationService = createApplicationService;
// Tüm Başvuruları Listeleme
const getAllApplicationsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield application_model_1.default.find();
});
exports.getAllApplicationsService = getAllApplicationsService;
// Belirli Bir Başvuruyu Getirme
const getApplicationByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield application_model_1.default.findById(id);
});
exports.getApplicationByIdService = getApplicationByIdService;
// Başvuru Güncelleme
const updateApplicationService = (id, updates) => __awaiter(void 0, void 0, void 0, function* () {
    return yield application_model_1.default.findByIdAndUpdate(id, updates, { new: true });
});
exports.updateApplicationService = updateApplicationService;
// Başvuru Silme
const deleteApplicationService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield application_model_1.default.findByIdAndDelete(id);
});
exports.deleteApplicationService = deleteApplicationService;
// Avukat Atama
const assignLawyerService = (applicationId, lawyerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield application_model_1.default.findByIdAndUpdate(applicationId, { avukatId: lawyerId }, { new: true });
});
exports.assignLawyerService = assignLawyerService;
// Hak İhlali Ekleme
const addViolationService = (applicationId, violationId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield application_model_1.default.findByIdAndUpdate(applicationId, { hakIhlaliId: violationId }, { new: true });
});
exports.addViolationService = addViolationService;
//# sourceMappingURL=application-service.js.map