import { Request, Response } from "express";
import TopicSetModel from "../models/TopicSetModel";

const topicSetCtrl = {
  /**
   * Lấy toàn bộ bộ đề của chủ đề tương ứng
   * @param req
   * @param res
   */
  getTopicSets: async (req: Request, res: Response) => {
    try {
      if (req && req.params) {
        const results = await TopicSetModel.find({
          topic: req.params.topic,
        });
        if (results && results.length > 0) {
          res.status(200).json(results);
        }
      }
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },

  /**
   * Lấy thông tin bộ đề
   * @param req
   * @param res
   */
  getTopicSet: async (req: Request, res: Response) => {
    try {
      if (req && req.params) {
        const result = await TopicSetModel.findOne({
          _id: req.params.topicSetId,
        });
        if (result) {
          res.status(200).json(result);
        }
      } else {
        res.status(400).json({ success: false, msg: "Bộ đề không tồn tại" });
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
  createTopicSet: async (req: Request, res: Response) => {
    try {
      if (req && req.body) {
        const results = req.body;
        if (results && results.length > 0) {
          for (let i = 0; i < results.length; i++) {
            const new_topicSet = new TopicSetModel(results[i]);
            // Lưu thông tin kết quả
            await new_topicSet.save();
          }
        }
        res.status(200).json({ success: true, msg: "Lưu kết quả thành công" });
      } else {
        res
          .status(400)
          .json({ success: false, msg: "Cung cấp thông tin bộ đề" });
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
  deleteTopicSet: async (req: Request, res: Response) => {
    try {
      if (req && req.params) {
        const topicSet = await TopicSetModel.findOneAndDelete({
          _id: req.params.topicSetId,
        });
        if (topicSet) {
          return res
            .status(200)
            .json({ success: true, msg: "Xóa bộ đề thành công" });
        } else {
          return res.status(400).json({ msg: "Bộ đề không được tìm thấy." });
        }
      }
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },
};

export default topicSetCtrl;
