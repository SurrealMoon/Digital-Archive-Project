"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const case_controller_1 = require("../controllers/case-controller");
const auth_middleware_1 = require("../middlewares/auth-middleware"); // Token doğrulama
const role_middleware_1 = require("../middlewares/role-middleware"); // Rol bazlı kontrol
const router = express_1.default.Router();
// CRUD Routes
router.post("/", auth_middleware_1.protect, (0, role_middleware_1.restrictTo)("admin"), case_controller_1.createCase); // Yalnızca admin yeni dava oluşturabilir
router.get("/", auth_middleware_1.protect, case_controller_1.getAllCases); // Tüm davalar (admin ve avukat görebilir)
router.get("/:id", auth_middleware_1.protect, case_controller_1.getCaseById); // Belirli bir dava bilgisi
router.put("/:id", auth_middleware_1.protect, (0, role_middleware_1.restrictTo)("admin", "lawyer"), case_controller_1.updateCase); // Yalnızca admin veya ilgili avukat güncelleyebilir
router.delete("/:id", auth_middleware_1.protect, (0, role_middleware_1.restrictTo)("admin"), case_controller_1.deleteCase); // Dava silme (yalnızca admin)
exports.default = router;
//# sourceMappingURL=case-routes.js.map