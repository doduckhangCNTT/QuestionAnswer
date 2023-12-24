"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Database game ghép ảnh
const collageSchema = new mongoose_1.default.Schema({
    /**Tên ảnh */
    name: {
        type: String,
        required: [true, "Thêm câu hỏi"],
        trim: true,
    },
    /**Nguồn ảnh */
    src: {
        type: String,
        trim: true,
    },
    /**Âm thanh */
    audio: {
        type: String,
        trim: true,
    },
    /**Link Youtube  */
    linkYoutube: {
        type: String,
        trim: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("collages", collageSchema);
