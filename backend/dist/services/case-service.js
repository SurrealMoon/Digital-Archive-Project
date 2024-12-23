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
exports.deleteCaseService = exports.updateCaseService = exports.getCaseByIdService = exports.getAllCasesService = exports.createCaseService = void 0;
const case_model_1 = __importDefault(require("../models/case-model"));
// Yeni dava oluşturma
const createCaseService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newCase = new case_model_1.default(data);
    return yield newCase.save();
});
exports.createCaseService = createCaseService;
// Tüm davaları listeleme
const getAllCasesService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield case_model_1.default.find().populate("applicationId").populate("lawyerId");
});
exports.getAllCasesService = getAllCasesService;
// Belirli bir davayı getirme
const getCaseByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield case_model_1.default.findById(id).populate("applicationId").populate("lawyerId");
});
exports.getCaseByIdService = getCaseByIdService;
// Dava güncelleme
const updateCaseService = (id, updates) => __awaiter(void 0, void 0, void 0, function* () {
    return yield case_model_1.default.findByIdAndUpdate(id, updates, { new: true });
});
exports.updateCaseService = updateCaseService;
// Dava silme
const deleteCaseService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield case_model_1.default.findByIdAndDelete(id);
});
exports.deleteCaseService = deleteCaseService;
//# sourceMappingURL=case-service.js.map