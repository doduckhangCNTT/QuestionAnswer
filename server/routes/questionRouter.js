"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const questionCtrl_1 = __importDefault(require("../controller/questionCtrl"));
const router = express_1.default.Router();
router.get("/questions", questionCtrl_1.default.getQuestions);
router.get("/question/:id", questionCtrl_1.default.getQuestion);
router.post("/create/question", questionCtrl_1.default.createQuestion);
router.patch("/update/question/:id", questionCtrl_1.default.updateQuestion);
router.delete("/delete/question/:id", questionCtrl_1.default.deleteQuestion);
exports.default = router;
