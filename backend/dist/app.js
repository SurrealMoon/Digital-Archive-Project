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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = __importDefault(require("./routes/user-routes")); // Admin routes dosyası
const auth_middleware_1 = require("./middlewares/auth-middleware"); // Token doğrulama middleware
const application_routes_1 = __importDefault(require("./routes/application-routes"));
const violation_routes_1 = __importDefault(require("./routes/violation-routes"));
const case_routes_1 = __importDefault(require("./routes/case-routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3002;
const MONGO_URI = process.env.MONGO_URI || '';
app.use(express_1.default.json());
app.use("/api/archive", application_routes_1.default);
app.use("/api/violations", violation_routes_1.default);
app.use("/api/cases", case_routes_1.default);
// MongoDB Connection
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('MongoDB connection failed:', error.message);
        }
        else {
            console.error('MongoDB connection failed with an unknown error');
        }
        process.exit(1);
    }
});
// Routes
app.use('/api/admin', user_routes_1.default); // Admin login ve diğer işlemler için
// Protected Test Route (middleware testi için)
app.get('/api/protected', auth_middleware_1.protect, (req, res) => {
    res.json({ message: 'This is a protected route accessible only with a valid token' });
});
// Start Server
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
}));
//# sourceMappingURL=app.js.map