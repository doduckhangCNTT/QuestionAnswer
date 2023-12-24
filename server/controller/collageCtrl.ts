import { Request, Response } from "express";
import Questions from "../models/questionModel";

const collageCtrl = {
  /**
   * Lấy toàn bộ các câu hỏi
   * @param req
   * @param res
   */
  getCollages: async (req: Request, res: Response) => {
    try {
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
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },
};

export default collageCtrl;
