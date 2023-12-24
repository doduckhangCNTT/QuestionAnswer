import express from "express";
import crossWordCtrl from "../controller/crossWordCtrl";

const router = express.Router();

router.get("/crossWords", crossWordCtrl.getCrossWords);

router.get("/crossWord/:id", crossWordCtrl.getCrossWord);

router.post("/create/crossWord", crossWordCtrl.createCrossWord);

router.patch("/update/crossWord/:id", crossWordCtrl.updateCrossWord);

router.delete("/delete/crossWord/:id", crossWordCtrl.deleteCrossWord);

export default router;
