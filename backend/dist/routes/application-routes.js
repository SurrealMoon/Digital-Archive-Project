"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const application_controller_1 = require("../controllers/application-controller");
const router = express_1.default.Router();
// CRUD Routes
router.post("/", application_controller_1.createApplication); // Yeni başvuru oluşturma
router.get("/", application_controller_1.getAllApplications); // Tüm başvuruları listeleme
router.get("/:id", application_controller_1.getApplicationById); // Belirli bir başvuruyu getirme
router.put("/:id", application_controller_1.updateApplication); // Başvuru güncelleme
router.delete("/:id", application_controller_1.deleteApplication); // Başvuru silme
// Ek Özellikler
router.put("/:id/assign-lawyer", application_controller_1.assignLawyer); // Avukat atama
router.put("/:id/add-violation", application_controller_1.addViolation); // Hak ihlali ekleme
exports.default = router;
//# sourceMappingURL=application-routes.js.map