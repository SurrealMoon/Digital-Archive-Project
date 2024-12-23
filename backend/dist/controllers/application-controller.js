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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addViolation = exports.assignLawyer = exports.deleteApplication = exports.updateApplication = exports.getApplicationById = exports.getAllApplications = exports.createApplication = void 0;
const application_service_1 = require("../services/application-service");
// Yeni Başvuru Oluşturma
const createApplication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const application = yield (0, application_service_1.createApplicationService)(req.body);
        res.status(201).json(application); // Burada açıkça bir JSON yanıt dönüyoruz.
        return; // TypeScript'e fonksiyonun sonlandığını belirtmek için return ekliyoruz.
    }
    catch (error) {
        next(error);
    }
});
exports.createApplication = createApplication;
// Tüm Başvuruları Listeleme
const getAllApplications = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const applications = yield (0, application_service_1.getAllApplicationsService)();
        res.status(200).json(applications); // Yanıt döndürüyoruz.
        return; // Fonksiyonun sonlandığını belirtmek için return ekliyoruz.
    }
    catch (error) {
        next(error);
    }
});
exports.getAllApplications = getAllApplications;
// Belirli Bir Başvuru Getirme
const getApplicationById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const application = yield (0, application_service_1.getApplicationByIdService)(id);
        if (!application) {
            res.status(404).json({ message: "Application not found" });
            return; // Fonksiyonun sonlandığını belirtmek için return ekliyoruz.
        }
        res.status(200).json(application);
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.getApplicationById = getApplicationById;
// Başvuru Güncelleme
const updateApplication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedApplication = yield (0, application_service_1.updateApplicationService)(id, req.body);
        if (!updatedApplication) {
            res.status(404).json({ message: "Application not found" });
            return;
        }
        res.status(200).json(updatedApplication);
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.updateApplication = updateApplication;
// Başvuru Silme
const deleteApplication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedApplication = yield (0, application_service_1.deleteApplicationService)(id);
        if (!deletedApplication) {
            res.status(404).json({ message: "Application not found" });
            return;
        }
        res.status(200).json({ message: "Application deleted successfully" });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.deleteApplication = deleteApplication;
// Avukat Atama
const assignLawyer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { avukatId } = req.body;
        const updatedApplication = yield (0, application_service_1.assignLawyerService)(id, avukatId);
        if (!updatedApplication) {
            res.status(404).json({ message: "Application not found" });
            return;
        }
        res.status(200).json(updatedApplication);
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.assignLawyer = assignLawyer;
// Hak İhlali Ekleme
const addViolation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { hakIhlaliId } = req.body;
        const updatedApplication = yield (0, application_service_1.addViolationService)(id, hakIhlaliId);
        if (!updatedApplication) {
            res.status(404).json({ message: "Application not found" });
            return;
        }
        res.status(200).json(updatedApplication);
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.addViolation = addViolation;
//# sourceMappingURL=application-controller.js.map