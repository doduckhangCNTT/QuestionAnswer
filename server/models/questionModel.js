"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const questionSchema = new mongoose_1.default.Schema({
    // Câu hỏi lựa chọn
    question: {
        type: String,
        required: [true, "Thêm câu hỏi"],
        trim: true,
    },
    videoLink: {
        typeVideo: String,
        link: String,
    },
    options: [
        {
            index: Number,
            content: String,
        },
    ],
    imgs: [],
    /**Câu trả lời đổi với kiểu câu hỏi lựa chọn*/
    correctAnswerIndex: {
        type: Number,
    },
    // Câu hỏi điền đáp án
    desc: String,
    /**Câu trả lời đối với kiểu câu hỏi nhập đáp án */
    answer: String,
    /**Chủ đề của câu hỏi (Truy tìm cổ vật, Giải mã kho báu) */
    topicSetQuestion: Number,
    /**Kiểu câu trả lời */
    typeAnswer: Number,
}, { timestamps: true });
exports.default = mongoose_1.default.model("questions", questionSchema);
