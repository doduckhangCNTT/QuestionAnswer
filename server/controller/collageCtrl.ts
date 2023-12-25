import { Request, Response } from "express";
import Collages from "../models/CollageModel";

const collageCtrl = {
  /**
   * Lấy toàn bộ các câu hỏi
   * @param req
   * @param res
   */
  getCollages: async (req: Request, res: Response) => {
    try {
      const collages = await Collages.find();
      if (collages && collages.length > 0) {
        res.json(collages);
      }
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },

  /**
   * Lấy thông tin câu hỏi
   * @param req
   * @param res
   */
  getCollage: async (req: Request, res: Response) => {
    try {
      if (req && req.params) {
        const collage = await Collages.findOne({ _id: req.params.id });
        if (collage) {
          res.status(200).json(collage);
        } else {
          res
            .status(400)
            .json({ success: false, msg: "Câu hỏi không tồn tại" });
        }
      }
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },

  /**
   * Tạo mới câu hỏi
   * @param req
   * @param res
   */
  createCollage: async (req: Request, res: Response) => {
    console.log(req.body);
    try {
      if (req && req.body) {
        const collages = req.body;
        for (var i = 0; i < collages.length; i++) {
          const new_question = new Collages(collages[i]);
          // Lưu thông tin người dùng
          await new_question.save();
        }
        res.json({ success: true, msg: "Tạo câu hỏi thành công" });
      }
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },

  /**
   * Cập nhật thông tin câu hỏi
   * @param req
   * @param res
   */
  updateCollage: async (req: Request, res: Response) => {
      try {
      if (req && req.body && req.params) {
        // Kiểm tra xem câu hỏi đã được tạo trước đó hay chưa
        const isCollage = await Collages.findOne({ _id: req.params.id });
        if (isCollage) {
          // Thực hiện cập nhật
          const collage = await Collages.findOneAndUpdate(
            {
              _id: req.params.id,
            },
            req.body
          );
          if (collage) {
            res
              .status(200)
              .json({ success: true, msg: "Cập nhật câu hỏi thành công" });
          }
        } else {
          res
            .status(400)
            .json({ success: false, msg: "Không tồn tại câu hỏi để cập nhật" });
        }
      }
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },

  /**
   * Xóa câu hỏi
   * @param req
   * @param res
   */
  deleteCollage: async (req: Request, res: Response) => {
    try {
       console.log(req.body);
      if (req && req.body) {
        const collage = await Collages.findOneAndDelete({
          _id: req.params.id,
        });
        if (collage) {
          return res
            .status(200)
            .json({ success: true, msg: "Xóa câu hỏi thành công" });
        } else {
          return res.status(400).json({ msg: "Câu hỏi không được tìm thấy." });
        }
      }
      res.status(400).json({ msg: "Cung cấp thông tin để xóa câu hỏi" });
    
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },
};

export default collageCtrl;
