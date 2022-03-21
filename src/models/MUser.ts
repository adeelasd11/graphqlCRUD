import { IUser } from "./../types/IUsers.d";
import { mongoose } from "./../db.js";
import { emailRegex } from "../validator/basic.js";
import { userType } from "../global/userType.js";
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: [emailRegex],
    unique: true,
    required: true,
  },
  password: {
    type: String,
    min: 15,
  },
  type: {
    type: Number,
    default: userType.Active,
  },
});

export const MUser = mongoose.model<IUser>("users", UserSchema);
