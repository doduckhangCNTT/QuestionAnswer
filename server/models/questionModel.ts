import mongoose from "mongoose";
import { IQuestion } from "../config/interface";

const questionSchema = new mongoose.Schema(
  {
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
    imgs: [] as String[],

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
  },
  { timestamps: true }
);

export default mongoose.model<IQuestion>("questions", questionSchema);
