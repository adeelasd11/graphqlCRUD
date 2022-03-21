import { IChat } from "./../types/IChat.d";
import { mongoose } from "../db.js";
import { Schema } from "./DB.js";
import { MessageType } from "../global/messageType.js";
const Chat = new mongoose.Schema({
  conversationId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "chatRoom",
  },
  userFromId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  userToId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  message: String,
  type: {
    type: Number,
    default: MessageType.Text,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const MChat = mongoose.model<IChat>("chat", Chat);
