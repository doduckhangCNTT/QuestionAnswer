import express from "express";
import resultUserCtrl from "../controller/resultUserCtrl";

const router = express.Router();

router.get("/results/:userId", resultUserCtrl.getResults);

router.post("/create/result-user", resultUserCtrl.createResult);

export default router;
