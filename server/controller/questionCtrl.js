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
const questionModel_1 = __importDefault(require("../models/questionModel"));
const questionCtrl = {
    /**
     * Lấy toàn bộ các câu hỏi
     * @param req
     * @param res
     */
    getQuestions: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const questions = yield questionModel_1.default.find();
            if (questions && questions.length > 0) {
                res.json(questions);
            }
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }),
    /**
     * Lấy thông tin câu hỏi
     * @param req
     * @param res
     */
    getQuestion: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (req && req.params) {
                const question = yield questionModel_1.default.findOne({ _id: req.params.id });
                if (question) {
                    res.status(200).json(question);
                }
                else {
                    res
                        .status(400)
                        .json({ success: false, msg: "Câu hỏi không tồn tại" });
                }
            }
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }),
    /**
     * Tạo mới câu hỏi
     * @param req
     * @param res
     */
    createQuestion: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.body);
        try {
            if (req && req.body) {
                const questions = req.body;
                for (var i = 0; i < questions.length; i++) {
                    const new_question = new questionModel_1.default(questions[i]);
                    // Lưu thông tin người dùng
                    yield new_question.save();
                }
                res.json({ success: true, msg: "Tạo câu hỏi thành công" });
            }
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }),
    /**
     * Cập nhật thông tin câu hỏi
     * @param req
     * @param res
     */
    updateQuestion: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (req && req.body && req.params) {
                // Kiểm tra xem câu hỏi đã được tạo trước đó hay chưa
                const isQuestion = yield questionModel_1.default.findOne({ _id: req.params.id });
                if (isQuestion) {
                    // Thực hiện cập nhật
                    const question = yield questionModel_1.default.findOneAndUpdate({
                        _id: req.params.id,
                    }, req.body);
                    if (question) {
                        res
                            .status(200)
                            .json({ success: true, msg: "Cập nhật câu hỏi thành công" });
                    }
                }
                else {
                    res
                        .status(400)
                        .json({ success: false, msg: "Không tồn tại câu hỏi để cập nhật" });
                }
            }
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }),
    /**
     * Xóa câu hỏi
     * @param req
     * @param res
     */
    deleteQuestion: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.body);
            if (req && req.body) {
                const question = yield questionModel_1.default.findOneAndDelete({
                    _id: req.params.id,
                });
                if (question) {
                    return res
                        .status(200)
                        .json({ success: true, msg: "Xóa câu hỏi thành công" });
                }
                else {
                    return res.status(400).json({ msg: "Câu hỏi không được tìm thấy." });
                }
            }
            res.status(400).json({ msg: "Cung cấp thông tin để xóa câu hỏi" });
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }),
};
exports.default = questionCtrl;
