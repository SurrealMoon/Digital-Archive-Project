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
exports.deleteViolation = exports.updateViolation = exports.getViolationById = exports.getAllViolations = exports.createViolation = void 0;
const violation_service_1 = require("../services/violation-service");
// Yeni Hak İhlali Ekleme
const createViolation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const violation = yield (0, violation_service_1.createViolationService)(req.body);
        res.status(201).json(violation);
        return; // Fonksiyonun sonlandığını belirtmek için return eklenir
    }
    catch (error) {
        next(error);
    }
});
exports.createViolation = createViolation;
// Tüm Hak İhlallerini Listeleme
const getAllViolations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const violations = yield (0, violation_service_1.getAllViolationsService)();
        res.status(200).json(violations);
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.getAllViolations = getAllViolations;
// Belirli Bir Hak İhlalini Getirme
const getViolationById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const violation = yield (0, violation_service_1.getViolationByIdService)(id);
        if (!violation) {
            res.status(404).json({ message: "Violation not found" });
            return;
        }
        res.status(200).json(violation);
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.getViolationById = getViolationById;
// Hak İhlali Güncelleme
const updateViolation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedViolation = yield (0, violation_service_1.updateViolationService)(id, req.body);
        if (!updatedViolation) {
            res.status(404).json({ message: "Violation not found" });
            return;
        }
        res.status(200).json(updatedViolation);
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.updateViolation = updateViolation;
// Hak İhlali Silme
const deleteViolation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedViolation = yield (0, violation_service_1.deleteViolationService)(id);
        if (!deletedViolation) {
            res.status(404).json({ message: "Violation not found" });
            return;
        }
        res.status(200).json({ message: "Violation deleted successfully" });
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.deleteViolation = deleteViolation;
//# sourceMappingURL=violation-controller.js.map