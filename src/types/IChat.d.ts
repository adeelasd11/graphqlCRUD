import { userType } from "../global/userType";

export interface IChat {
  conversationId: string;
  userId: string;
  message: String;
  type: number;
  createdAt: string;
}
export interface IChatInput {
  toId: string;
  message: string;
  type: userType;
}