import { getSessionId } from './../models/Base';
import { MChatRoom } from "./../models/MChatRoom.js";
export const sendMessage = (
  _: any,
  data: { input: number },
  body: any,
  select: any
) => {
  const channel = MChatRoom.findOneAndUpdate({
    isGroup: false,
    userIds: {
      $in: [getSessionId(body)],
    },
  });
};
