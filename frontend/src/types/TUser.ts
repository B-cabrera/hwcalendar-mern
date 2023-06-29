import { ObjectId } from "mongodb"

export type TUser = {
  _id: ObjectId;
  refreshToken: string,
  email: string,
  classes: ObjectId[]
}