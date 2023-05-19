import { Request, Response } from "express";
import Users from "../model/User";

export async function initAuth(req: Request, res: Response) {
  const googleAuthCode = req.body.code

  try {
    const newUser = new Users({
      authCode: googleAuthCode
    })
    
    // TEMP FLOW: CREATES A USER IN DATABASE
    const createdUser = await newUser.save()
    
    res.status(201)
    res.json(createdUser._id);
  } catch (error) {
    res.status(400);
    res.send("Error saving user")
  }


}