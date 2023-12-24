import { Request, Response } from "express";
import Questions from "../models/questionModel";

const crossWordCtrl = {
  /**
   * Lấy toàn bộ các câu hỏi
   * @param req
   * @param res
   */
  getCrossWords: async (req: Request, res: Response) => {
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
  getCrossWord: async (req: Request, res: Response) => {
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
  createCrossWord: async (req: Request, res: Response) => {
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
  updateCrossWord: async (req: Request, res: Response) => {
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
  deleteCrossWord: async (req: Request, res: Response) => {
    try {
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },
};

export default crossWordCtrl;
