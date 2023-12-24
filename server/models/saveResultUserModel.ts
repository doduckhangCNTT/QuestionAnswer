import mongoose from "mongoose";
import { IResultQuestion } from "../config/interface";

const resultUserSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "users" },
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
  },
  { timestamps: true }
);

export default mongoose.model("resultUsers", resultUserSchema);
