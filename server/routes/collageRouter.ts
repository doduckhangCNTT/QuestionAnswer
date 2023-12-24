import express from "express";
import authUser from "../middleware/authUser";
import collageCtrl from "../controller/collageCtrl";

const router = express.Router();

router.get("/collages", collageCtrl.getCollages);

router.get("/collage/:id", collageCtrl.getCollage);

router.post("/create/collage", collageCtrl.createCollage);

router.patch("/update/collage/:id", collageCtrl.updateCollage);

router.delete("/delete/collage/:id", collageCtrl.deleteCollage);

export default router;
