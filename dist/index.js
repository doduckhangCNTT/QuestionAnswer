"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = require("http");
// Middleware
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({
    origin: `${process.env.BASE_URL}`,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
const http = (0, http_1.createServer)(app);
// ------------------ Routes --------------------------
app.use("/api", routes_1.default);
// ------------------ Database ------------------------
mongoose_1.default
    .connect(process.env.MONGOOSE_URL, {
// useNewUrlParser: true,
// useUnifiedTopology: true,
// useCreateIndex: true,
// useFindAndModify: false,
// poolSize: parseInt(process.env.POOL_SIZE!),
})
    .then((res) => {
    console.log("Connected database");
})
    .catch((err) => {
    console.log(`Initial Distribution API Database connection error occured -`, err);
});
// ------------------ Server Listening ----------------
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
    console.log("Server listening on port ", PORT);
});
