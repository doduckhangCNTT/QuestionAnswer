"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRouter_1 = __importDefault(require("./authRouter"));
const questionRouter_1 = __importDefault(require("./questionRouter"));
const resultUserRouter_1 = __importDefault(require("./resultUserRouter"));
const collageRouter_1 = __importDefault(require("./collageRouter"));
const crossWordRouter_1 = __importDefault(require("./crossWordRouter"));
const routes = [
    authRouter_1.default,
    questionRouter_1.default,
    resultUserRouter_1.default,
    collageRouter_1.default,
    crossWordRouter_1.default,
];
exports.default = routes;
