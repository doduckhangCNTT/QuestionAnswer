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
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = require("../config/generateToken");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authCtrl = {
    /**
     * Xử lí thông tin đăng kí
     * @param req Yêu cầu thông tin đăng kí gửi lên
     * @param res Thông tin phản hồi
     */
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, account, password } = req.body;
            if (!name || !account || !password) {
                return res.json({
                    success: false,
                    msg: "Nhập đầy đủ thông tin đăng kí người dùng",
                });
            }
            const user = yield userModel_1.default.findOne({ account });
            if (user) {
                return res.json({ success: false, msg: "Người dùng đã tồn tại" });
            }
            // Mã hóa mật khẩu
            const passwordHash = yield bcrypt_1.default.hash(password, 12);
            // Tạo mới người dùng
            const newUser = { name, account, password: passwordHash };
            const new_user = new userModel_1.default(newUser);
            // Lưu thông tin người dùng
            yield new_user.save();
            res.json({ success: true, msg: "Đăng kí thành công" });
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }),
    /**
     * Xử lí thông tin đăng nhập
     * @param req Yêu cầu thông tin đăng kí gửi lên
     * @param res Thông tin phản hồi
     */
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { account, password } = req.body;
            if (!account || !password) {
                return res.json({
                    success: false,
                    msg: "Cung cấp đầy đủ thông tin đăng nhập",
                });
            }
            const user = yield userModel_1.default.findOne({ account });
            if (!user) {
                return res.json({ success: false, msg: "Người dùng không tồn tại" });
            }
            loginUser(user, password, res);
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }),
    /**
     * Đăng xuất khỏi ứng dụng
     * @param req
     * @param res
     * @returns
     */
    logout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (!req.user)
            return res
                .status(400)
                .json({ success: false, msg: "Thông tin không hợp lệ" });
        try {
            // Xóa token trong cookie
            res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
            // Cập nhật lại thông tin token của người dùng tương ứng
            yield userModel_1.default.findOneAndUpdate({ _id: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }, { rf_token: "" });
            res.json({ success: true, msg: "Logged out" });
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }),
    /**
     * Thực hiện lấy token mới
     * @param req
     * @param res
     * @returns
     */
    refreshToken: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) {
                return res.json({
                    success: false,
                    msg: "Bạn cần đăng nhập",
                });
            }
            const decoded = (jsonwebtoken_1.default.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`));
            if (!decoded.id) {
                return res.status(400).json({ success: false, msg: "Bạn cần đăng kí" });
            }
            const user = yield userModel_1.default.findById(decoded.id).select("-password +rf_token");
            if (!user) {
                return res
                    .status(400)
                    .json({ success: false, msg: "Không tìm thấy người dùng" });
            }
            const access_token = (0, generateToken_1.generateAccessToken)({ id: user._id });
            const refresh_token = (0, generateToken_1.generateRefreshToken)({ id: user._id }, res);
            yield userModel_1.default.findOneAndUpdate({ _id: user._id }, { rf_token: refresh_token });
            res.json({
                success: true,
                msg: "Refresh token was successfully",
                user,
                access_token,
                refresh_token,
            });
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }),
};
const loginUser = (user, password, res) => __awaiter(void 0, void 0, void 0, function* () {
    const check = yield bcrypt_1.default.compare(password, user.password);
    if (!check)
        return res.json({
            success: false,
            msg: "Thông tin đăng nhập không hợp lệ",
        });
    const access_token = (0, generateToken_1.generateAccessToken)({ id: user._id });
    const refresh_token = (0, generateToken_1.generateRefreshToken)({ id: user._id }, res);
    yield userModel_1.default.findOneAndUpdate({ _id: user._id }, { rf_token: refresh_token });
    res.json({
        success: true,
        msg: "Đăng nhập thành công",
        access_token,
        refresh_token,
        user: Object.assign(Object.assign({}, user._doc), { password: "" }),
    });
});
const registerUser = (user, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new userModel_1.default(user);
    const access_token = (0, generateToken_1.generateAccessToken)({ id: newUser._id });
    const refresh_token = (0, generateToken_1.generateRefreshToken)({ id: newUser._id }, res);
    res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 3600 * 24 * 60 * 60 * 1000, // 30 day
    });
    newUser.rf_token = refresh_token;
    yield newUser.save();
    res.json({
        success: true,
        msg: "Login successful",
        access_token,
        refresh_token,
        user: Object.assign(Object.assign({}, newUser._doc), { password: "" }),
    });
});
exports.default = authCtrl;
