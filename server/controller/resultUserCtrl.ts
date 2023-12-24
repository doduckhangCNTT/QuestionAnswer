import { Request, Response } from "express";
import ResultUsers from "../models/saveResultUserModel";

const resultUserCtrl = {
  /**
   * Lấy toàn bộ các câu hỏi
   * @param req
   * @param res
   */
  getResults: async (req: Request, res: Response) => {
    try {
      if (req && req.params) {
        const results = await ResultUsers.find({
          user: req.params.userId,
        })
          .populate("user", "-password")
          .sort({ createdAt: -1 });
        if (results && results.length > 0) {
          res.json(results);
        }
      }
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },

  /**
   * Lưu thông tin kết quả
   * @param req
   * @param res
   */
  createResult: async (req: Request, res: Response) => {
    console.log(req.body);
    try {
      if (req && req.body) {
        const result = req.body;
        const new_question = new ResultUsers(result);
        // Lưu thông tin kết quả
        await new_question.save();
        res.json({ success: true, msg: "Lưu kết quả thành công" });
      }
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },
};

export default resultUserCtrl;
