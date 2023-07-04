import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";



export function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.get('authorization')?.split(' ')[1];

    const data = jwt.verify(token!, JWT_SECRET) as {};


    req.body = {
      ...req.body,
      ...data,
    }
    next();
  } catch (err) {
    res.status(401);
    res.send()
  }
}