import mongoose from "mongoose";
import { IQuestion } from "../config/interface";

// Database game điền chữ
const crossWordSchema = new mongoose.Schema(
  {
    /**Hàng */
    rows: [],
  },
  { timestamps: true }
);

export default mongoose.model("crossWords", crossWordSchema);
