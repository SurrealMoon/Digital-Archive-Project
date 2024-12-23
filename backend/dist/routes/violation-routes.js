"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const violation_controller_1 = require("../controllers/violation-controller");
const router = express_1.default.Router();
// CRUD Routes
router.post("/", violation_controller_1.createViolation); // Yeni hak ihlali ekleme
router.get("/", violation_controller_1.getAllViolations); // Tüm hak ihlallerini listeleme
router.get("/:id", violation_controller_1.getViolationById); // Belirli bir hak ihlalini getirme
router.put("/:id", violation_controller_1.updateViolation); // Hak ihlali güncelleme
router.delete("/:id", violation_controller_1.deleteViolation); // Hak ihlali silme
exports.default = router;
//# sourceMappingURL=violation-routes.js.map