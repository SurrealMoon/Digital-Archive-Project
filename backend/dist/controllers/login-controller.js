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
exports.loginUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user-model")); // Artık "User" modeli kullanıyoruz
// Kullanıcı Giriş Fonksiyonu
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield user_model_1.default.findOne({ username });
        if (user && user.password === password) {
            const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "defaultsecret", { expiresIn: "1d" } // 1 günlük geçerlilik süresi
            );
            res.status(200).json({
                id: user._id,
                username: user.username,
                role: user.role,
                token,
            });
        }
        else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=login-controller.js.map