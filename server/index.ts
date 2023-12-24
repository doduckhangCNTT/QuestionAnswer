import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes";
import mongoose, { ConnectOptions } from "mongoose";

import { createServer } from "http";

// Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: `${process.env.BASE_URL}`,
    credentials: true,
  })
);
app.use(cookieParser());

const http = createServer(app);
// ------------------ Routes --------------------------
app.use("/api", routes);

// ------------------ Database ------------------------
mongoose
  .connect(process.env.MONGOOSE_URL!, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // poolSize: parseInt(process.env.POOL_SIZE!),
  } as ConnectOptions)
  .then((res: any) => {
    console.log("Connected database");
  })
  .catch((err: any) => {
    console.log(
      `Initial Distribution API Database connection error occured -`,
      err
    );
  });

// ------------------ Server Listening ----------------
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
  console.log("Server listening on port ", PORT);
});
