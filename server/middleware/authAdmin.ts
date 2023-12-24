import { NextFunction, Response } from "express";
import { IReqAuth } from "../config/interface";

const authAdmin = (req: IReqAuth, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    if (!user)
      return res.status(400).json({ msg: "Không tìm thấy người dùng." });
    const role = user.role;
    if (role !== "admin") {
      return res.status(400).json({ msg: "Người dùng không phải là Admin" });
    }
    req.user = user;
    next();
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export default authAdmin;
