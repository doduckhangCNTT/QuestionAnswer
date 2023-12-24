"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authAdmin = (req, res, next) => {
    try {
        const user = req.user;
        if (!user)
            return res.status(400).json({ msg: "Không tìm thấy người dùng." });
        const role = user.role;
        if (role !== "admin") {
            return res.status(400).json({ msg: "Người dùng không phải là Admin" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
exports.default = authAdmin;
