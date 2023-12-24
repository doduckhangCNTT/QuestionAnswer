import express from "express";
import authUser from "../middleware/authUser";
import questionCtrl from "../controller/questionCtrl";

const router = express.Router();

router.get("/questions", questionCtrl.getQuestions);

router.get("/question/:id", questionCtrl.getQuestion);

router.post("/create/question", questionCtrl.createQuestion);

router.patch("/update/question/:id", questionCtrl.updateQuestion);

router.delete("/delete/question/:id", questionCtrl.deleteQuestion);

export default router;
