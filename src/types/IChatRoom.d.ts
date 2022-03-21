import { Document } from "mongoose";
export interface IChatRoom {
  _id: string;
  userIds: string[];
  isGroup: boolean;
  status: number;
}
