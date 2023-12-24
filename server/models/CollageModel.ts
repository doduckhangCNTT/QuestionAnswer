import mongoose from "mongoose";
import { IQuestion } from "../config/interface";

// Database game ghép ảnh
const collageSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model<IQuestion>("collages", collageSchema);
