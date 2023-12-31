import { Request, Response } from 'express';
import CrossWords from '../models/CrossWord';

const crossWordCtrl = {
  /**
   * Lấy toàn bộ các câu hỏi
   * @param req
   * @param res
   */
  getCrossWords: async (req: Request, res: Response) => {
    console.log(1);
    try {
      const crossWords = await CrossWords.find();
      if (crossWords && crossWords.length > 0) {
        res.json(crossWords);
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
  getCrossWord: async (req: Request, res: Response) => {
    try {
      if (req && req.params) {
        const question = await CrossWords.findOne({ _id: req.params.id });
        if (question) {
          res.status(200).json(question);
        } else {
          res
            .status(400)
            .json({ success: false, msg: 'Câu hỏi không tồn tại' });
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
  createCrossWord: async (req: Request, res: Response) => {
    console.log(req.body);
    try {
      if (req && req.body) {
        const questions = req.body;
        for (var i = 0; i < questions.length; i++) {
          const new_question = new CrossWords(questions[i]);
          // Lưu thông tin người dùng
          await new_question.save();
        }
        res.json({ success: true, msg: 'Tạo câu hỏi thành công' });
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
  updateCrossWord: async (req: Request, res: Response) => {
    try {
      if (req && req.body && req.params) {
        // Kiểm tra xem câu hỏi đã được tạo trước đó hay chưa
        const isQuestion = await CrossWords.findOne({ _id: req.params.id });
        if (isQuestion) {
          // Thực hiện cập nhật
          const question = await CrossWords.findOneAndUpdate(
            {
              _id: req.params.id,
            },
            req.body,
          );
          if (question) {
            res
              .status(200)
              .json({ success: true, msg: 'Cập nhật câu hỏi thành công' });
          }
        } else {
          res
            .status(400)
            .json({ success: false, msg: 'Không tồn tại câu hỏi để cập nhật' });
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
  deleteCrossWord: async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      if (req && req.body) {
        const question = await CrossWords.findOneAndDelete({
          _id: req.params.id,
        });
        if (question) {
          return res
            .status(200)
            .json({ success: true, msg: 'Xóa câu hỏi thành công' });
        } else {
          return res.status(400).json({ msg: 'Câu hỏi không được tìm thấy.' });
        }
      }
      res.status(400).json({ msg: 'Cung cấp thông tin để xóa câu hỏi' });
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },
};

export default crossWordCtrl;
