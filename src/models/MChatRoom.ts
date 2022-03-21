import { Document } from 'mongoose';
import { IChatRoom } from "./../types/IChatRoom.d";
import { mongoose } from "../db.js";
import { Schema } from "./DB.js";
const CharRoom = new mongoose.Schema({
  userIds: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
  ],
  isGroup: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Number,
    default: 1,
  },
});

export const MChatRoom = mongoose.model<Document<IChatRoom>>("chatRoom", CharRoom);
