import { Request } from "express";
import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  account: string;
  password: string;
  avatar: string;
  role: string;
  type: string;
  rf_token: string;
  _doc: object;
}

export interface IReqAuth extends Request {
  user?: IUser;
  files?: any;
}

export interface INewUser {
  name: string;
  account: string;
  password: string;
}

export interface IUserParams {
  name: string;
  account: string;
  password: string;
  avatar?: string;
  type: string;
}

export interface IDecodedToken {
  id?: string;
  newUser?: INewUser;
  iat: number;
  exp: number;
}

export interface IReqAuth extends Request {
  user?: IUser;
  files?: any;
}

type VideoLinkType = {
  typeVideo: string;
  link: string;
};

type OptionQuestionType = {
  index: number;
  content: string;
};
export interface IQuestion extends Document {
  // Câu hỏi lựa chọn
  question: string;
  videoLink?: VideoLinkType;
  options?: OptionQuestionType;
  imgs?: string[];

  /**Câu trả lời đổi với kiểu câu hỏi lựa chọn*/
  selectedAnswerIndex?: string;

  // Câu hỏi điền đáp án
  desc?: string;
  /**Câu trả lời đối với kiểu câu hỏi nhập đáp án */
  answer?: string;

  /**Kiểu câu hỏi */
  typeQuestion: number;

  /**Kiểu câu trả lời */
  typeAnswer: number;
}

export interface IResultQuestion extends Document {
  user: IUser;
  pointNumber: string;
  /**Chủ đề của câu hỏi (Truy tìm cổ vật, Giải mã kho báu) */
  topicSetQuestion: number;
  /**Bộ đề số mấy trong chủ đề tương ứng */
  topicSetNumber: number;
}
