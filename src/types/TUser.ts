import { ObjectId } from "mongodb"

export type TUser = {
  _id: ObjectId;
  authCode: string,
  email: string,
  classes: ObjectId[]
}