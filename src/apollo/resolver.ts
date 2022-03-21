import { getActiveUsers } from "./../controller/eventController.js";
import {
  upsertUser,
  deleteUser,
  getUser,
  getUsers,
} from "./../controller/userController.js";
export const resolver = {
  Query: {
    users: getUsers,
    user: getUser,
    clients: getActiveUsers,
    // addUser
  },
  Mutation: {
    user: upsertUser,
    deleteUser: deleteUser,
  },
};
