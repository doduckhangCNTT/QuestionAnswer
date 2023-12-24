"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const resultUserSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Types.ObjectId, ref: "users" },
    pointNumber: {
        type: String,
        required: [true, "Không có thông tin điểm của người dùng"],
    },
    /**Chủ đề của câu hỏi (Truy tìm cổ vật, Giải mã kho báu) */
    topicSetQuestion: Number,
    /**Bộ đề số mấy trong chủ đề tương ứng */
    topicSetNumber: Number,
    /**Số lần chơi */
    numberPlay: Number,
}, { timestamps: true });
exports.default = mongoose_1.default.model("resultUsers", resultUserSchema);
