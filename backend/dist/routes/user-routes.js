"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_controller_1 = require("../controllers/login-controller");
const router = express_1.default.Router();
// Admin Login Route
router.post('/login', login_controller_1.loginUser);
exports.default = router;
//# sourceMappingURL=user-routes.js.map