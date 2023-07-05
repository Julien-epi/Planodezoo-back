import { ObjectId } from "mongoose";

interface ITicket {
  type: string;
  username: string;
  allowedSpaces: ObjectId[];
  validUntil?: Date;
  escapeGameOrder?: ObjectId[];
  validDays?: Date[];
}

export default ITicket;
