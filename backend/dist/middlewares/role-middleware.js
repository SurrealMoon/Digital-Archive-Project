"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = void 0;
// Rol kontrolü yapan middleware
const restrictTo = (...roles) => (req, res, next) => {
    try {
        const user = req.user; // req.user'ı any türüne dönüştürerek kontrol yapıyoruz
        if (!user || !roles.includes(user.role)) {
            res
                .status(403)
                .json({ message: "You do not have permission to perform this action" });
            return; // İşlem tamamlandıktan sonra return kullanıyoruz
        }
        next(); // Eğer kullanıcı yetkiliyse bir sonraki middleware'e geç
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred" });
        return; // İşlem tamamlandıktan sonra return kullanıyoruz
    }
};
exports.restrictTo = restrictTo;
//# sourceMappingURL=role-middleware.js.map