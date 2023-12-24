"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const collageCtrl_1 = __importDefault(require("../controller/collageCtrl"));
const router = express_1.default.Router();
router.get("/collages", collageCtrl_1.default.getCollages);
router.get("/collage/:id", collageCtrl_1.default.getCollage);
router.post("/create/collage", collageCtrl_1.default.createCollage);
router.patch("/update/collage/:id", collageCtrl_1.default.updateCollage);
router.delete("/delete/collage/:id", collageCtrl_1.default.deleteCollage);
exports.default = router;
