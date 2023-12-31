import mongoose from "mongoose";

/**Bộ đề của chủ đề tương ứng*/
const topicSetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nhập tên bộ đề"],
      trim: true,
    },
    topic: {
      type: Number,
      required: [true, "Nhập chủ đề của bộ đề"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("topicSets", topicSetSchema);
