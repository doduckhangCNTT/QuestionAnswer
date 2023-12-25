import mongoose from "mongoose";
import { IQuestion } from "../config/interface";

// Database game điền chữ
const crossWordSchema = new mongoose.Schema(
  {
     Link: {
      type: String,
      required: [true, "Thêm tài liệu"],
      trim: true,
    },
    /**Hàng */
    options: [
      {
        answer: String,
        typedAnswer: Number,
        question: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("crossWords", crossWordSchema);
