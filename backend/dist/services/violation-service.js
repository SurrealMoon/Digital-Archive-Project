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
exports.deleteViolationService = exports.updateViolationService = exports.getViolationByIdService = exports.getAllViolationsService = exports.createViolationService = void 0;
const violation_model_1 = __importDefault(require("../models/violation-model"));
// Yeni Hak İhlali Ekleme
const createViolationService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const violation = new violation_model_1.default(data);
    return yield violation.save();
});
exports.createViolationService = createViolationService;
// Tüm Hak İhlallerini Getirme
const getAllViolationsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield violation_model_1.default.find();
});
exports.getAllViolationsService = getAllViolationsService;
// Belirli Bir Hak İhlalini Getirme
const getViolationByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield violation_model_1.default.findById(id);
});
exports.getViolationByIdService = getViolationByIdService;
// Hak İhlali Güncelleme
const updateViolationService = (id, updates) => __awaiter(void 0, void 0, void 0, function* () {
    return yield violation_model_1.default.findByIdAndUpdate(id, updates, { new: true });
});
exports.updateViolationService = updateViolationService;
// Hak İhlali Silme
const deleteViolationService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield violation_model_1.default.findByIdAndDelete(id);
});
exports.deleteViolationService = deleteViolationService;
//# sourceMappingURL=violation-service.js.map