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
const saveResultUserModel_1 = __importDefault(require("../models/saveResultUserModel"));
const resultUserCtrl = {
    /**
     * Lấy toàn bộ các câu hỏi
     * @param req
     * @param res
     */
    getResults: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (req && req.params) {
                const results = yield saveResultUserModel_1.default.find({
                    user: req.params.userId,
                })
                    .populate("user", "-password")
                    .sort({ createdAt: -1 });
                if (results && results.length > 0) {
                    res.json(results);
                }
            }
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }),
    /**
     * Lưu thông tin kết quả
     * @param req
     * @param res
     */
    createResult: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.body);
        try {
            if (req && req.body) {
                const result = req.body;
                const new_question = new saveResultUserModel_1.default(result);
                // Lưu thông tin kết quả
                yield new_question.save();
                res.json({ success: true, msg: "Lưu kết quả thành công" });
            }
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }),
};
exports.default = resultUserCtrl;
