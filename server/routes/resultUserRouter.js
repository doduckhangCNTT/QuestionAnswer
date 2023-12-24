"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resultUserCtrl_1 = __importDefault(require("../controller/resultUserCtrl"));
const router = express_1.default.Router();
router.get("/results/:userId", resultUserCtrl_1.default.getResults);
router.post("/create/result-user", resultUserCtrl_1.default.createResult);
exports.default = router;
