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
exports.deleteCase = exports.updateCase = exports.getCaseById = exports.getAllCases = exports.createCase = void 0;
const case_service_1 = require("../services/case-service");
// Yeni dava oluşturma
const createCase = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCase = yield (0, case_service_1.createCaseService)(req.body);
        res.status(201).json(newCase);
    }
    catch (error) {
        next(error);
    }
});
exports.createCase = createCase;
// Tüm davaları listeleme
const getAllCases = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cases = yield (0, case_service_1.getAllCasesService)();
        res.status(200).json(cases);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllCases = getAllCases;
// Belirli bir davayı getirme
const getCaseById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const caseData = yield (0, case_service_1.getCaseByIdService)(id);
        if (!caseData) {
            res.status(404).json({ message: "Case not found" });
            return;
        }
        res.status(200).json(caseData);
    }
    catch (error) {
        next(error);
    }
});
exports.getCaseById = getCaseById;
// Dava güncelleme
const updateCase = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedCase = yield (0, case_service_1.updateCaseService)(id, req.body);
        if (!updatedCase) {
            res.status(404).json({ message: "Case not found" });
            return;
        }
        res.status(200).json(updatedCase);
    }
    catch (error) {
        next(error);
    }
});
exports.updateCase = updateCase;
// Dava silme
const deleteCase = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedCase = yield (0, case_service_1.deleteCaseService)(id);
        if (!deletedCase) {
            res.status(404).json({ message: "Case not found" });
            return;
        }
        res.status(200).json({ message: "Case deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCase = deleteCase;
//# sourceMappingURL=case-controller.js.map