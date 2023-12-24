"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const crossWordCtrl = {
    /**
     * Lấy toàn bộ các câu hỏi
     * @param req
     * @param res
     */
    getCrossWords: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }),
    /**
     * Lấy thông tin câu hỏi
     * @param req
     * @param res
     */
    getCrossWord: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }),
    /**
     * Tạo mới câu hỏi
     * @param req
     * @param res
     */
    createCrossWord: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.body);
        try {
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }),
    /**
     * Cập nhật thông tin câu hỏi
     * @param req
     * @param res
     */
    updateCrossWord: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }),
    /**
     * Xóa câu hỏi
     * @param req
     * @param res
     */
    deleteCrossWord: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }),
};
exports.default = crossWordCtrl;
