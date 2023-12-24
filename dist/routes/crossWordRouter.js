"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crossWordCtrl_1 = __importDefault(require("../controller/crossWordCtrl"));
const router = express_1.default.Router();
router.get("/crossWords", crossWordCtrl_1.default.getCrossWords);
router.get("/crossWord/:id", crossWordCtrl_1.default.getCrossWord);
router.post("/create/crossWord", crossWordCtrl_1.default.createCrossWord);
router.patch("/update/crossWord/:id", crossWordCtrl_1.default.updateCrossWord);
router.delete("/delete/crossWord/:id", crossWordCtrl_1.default.deleteCrossWord);
exports.default = router;
