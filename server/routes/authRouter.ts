import express from "express";
import authCtrl from "../controller/authCtrl";
import authUser from "../middleware/authUser";

const router = express.Router();

router.post("/register", authCtrl.register);

router.post("/login", authCtrl.login);

router.get("/logout", authUser, authCtrl.logout);

router.get("/refresh_token", authCtrl.refreshToken);

export default router;
