import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    /**Bộ đề của câu hỏi trong chủ đề tương ứng */
    questionSet: { type: mongoose.Types.ObjectId, ref: "topicSets" },

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

    /**Link tài liệu của câu hỏi */
    linkDoc: String,

    // Câu hỏi điền đáp án
    desc: String,
    /**Câu trả lời đối với kiểu câu hỏi nhập đáp án */
    answer: String,

    /**Chủ đề của câu hỏi (Truy tìm cổ vật, Giải mã kho báu) */
    topicSetQuestion: Number,

    /**Kiểu câu trả lời (Trắc nghiệm || Tự luận) */
    typeAnswer: Number,
  },
  { timestamps: true }
);

export default mongoose.model("questions", questionSchema);
