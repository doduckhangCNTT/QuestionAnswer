import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import { validEmail } from "../middleware/valid";
import {
  IDecodedToken,
  IReqAuth,
  IUser,
  IUserParams,
} from "../config/interface";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../config/generateToken";
import jwt from "jsonwebtoken";

const authCtrl = {
  /**
   * Xử lí thông tin đăng kí
   * @param req Yêu cầu thông tin đăng kí gửi lên
   * @param res Thông tin phản hồi
   */
  register: async (req: Request, res: Response) => {
    try {
      const { name, account, password } = req.body;
      if (!name || !account || !password) {
        return res.json({
          success: false,
          msg: "Nhập đầy đủ thông tin đăng kí người dùng",
        });
      }
      const user = await Users.findOne({ account });
      if (user) {
        return res.json({ success: false, msg: "Người dùng đã tồn tại" });
      }
      // Mã hóa mật khẩu
      const passwordHash = await bcrypt.hash(password, 12);
      // Tạo mới người dùng
      const newUser = { name, account, password: passwordHash };
      const new_user = new Users(newUser);
      // Lưu thông tin người dùng
      await new_user.save();
      res.json({ success: true, msg: "Đăng kí thành công" });
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },

  /**
   * Xử lí thông tin đăng nhập
   * @param req Yêu cầu thông tin đăng kí gửi lên
   * @param res Thông tin phản hồi
   */
  login: async (req: Request, res: Response) => {
    try {
      const { account, password } = req.body;
      if (!account || !password) {
        return res.json({
          success: false,
          msg: "Cung cấp đầy đủ thông tin đăng nhập",
        });
      }
      const user = await Users.findOne({ account });
      if (!user) {
        return res.json({ success: false, msg: "Người dùng không tồn tại" });
      }
      loginUser(user, password, res);
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },

  /**
   * Đăng xuất khỏi ứng dụng
   * @param req
   * @param res
   * @returns
   */
  logout: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res
        .status(400)
        .json({ success: false, msg: "Thông tin không hợp lệ" });
    try {
      // Xóa token trong cookie
      res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
      // Cập nhật lại thông tin token của người dùng tương ứng
      await Users.findOneAndUpdate({ _id: req.user?._id }, { rf_token: "" });
      res.json({ success: true, msg: "Logged out" });
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },

  /**
   * Thực hiện lấy token mới
   * @param req
   * @param res
   * @returns
   */
  refreshToken: async (req: IReqAuth, res: Response) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) {
        return res.json({
          success: false,
          msg: "Bạn cần đăng nhập",
        });
      }

      const decoded = <IDecodedToken>(
        jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`)
      );
      if (!decoded.id) {
        return res.status(400).json({ success: false, msg: "Bạn cần đăng kí" });
      }

      const user = await Users.findById(decoded.id).select(
        "-password +rf_token"
      );
      if (!user) {
        return res
          .status(400)
          .json({ success: false, msg: "Không tìm thấy người dùng" });
      }

      const access_token = generateAccessToken({ id: user._id });
      const refresh_token = generateRefreshToken({ id: user._id }, res);

      await Users.findOneAndUpdate(
        { _id: user._id },
        { rf_token: refresh_token }
      );

      res.json({
        success: true,
        msg: "Refresh token was successfully",
        user,
        access_token,
        refresh_token,
      });
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },
};

const loginUser = async (user: IUser, password: string, res: Response) => {
  const check = await bcrypt.compare(password, user.password);
  if (!check)
    return res.json({
      success: false,
      msg: "Thông tin đăng nhập không hợp lệ",
    });

  const access_token = generateAccessToken({ id: user._id });
  const refresh_token = generateRefreshToken({ id: user._id }, res);

  await Users.findOneAndUpdate({ _id: user._id }, { rf_token: refresh_token });

  res.json({
    success: true,
    msg: "Đăng nhập thành công",
    access_token,
    refresh_token,
    user: { ...user._doc, password: "" },
  });
};

const registerUser = async (user: IUserParams, res: Response) => {
  const newUser = new Users(user);

  const access_token = generateAccessToken({ id: newUser._id });
  const refresh_token = generateRefreshToken({ id: newUser._id }, res);

  res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,
    path: "/api/refresh_token",
    maxAge: 3600 * 24 * 60 * 60 * 1000, // 30 day
  });

  newUser.rf_token = refresh_token;
  await newUser.save();

  res.json({
    success: true,
    msg: "Login successful",
    access_token,
    refresh_token,
    user: { ...newUser._doc, password: "" },
  });
};

export default authCtrl;
