import { Request, Response } from "express";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET } from "../config";
import { OAuth2Client } from "google-auth-library";
import User from "../model/User";
import { TUser } from "../../types/TUser";
import jwt from 'jsonwebtoken';

interface UserInfoResponse {
  email: string
}

export async function initAuth(req: Request, res: Response) {
  const googleAuthCode = req.body.code

  try {
    const userEmail = await getUserEmail(googleAuthCode);

    let user = await User.findOne({email: userEmail}) as unknown as TUser;

    if (!user) {
      // CREATE NEW USER
      let newUser = new User({
        authCode: googleAuthCode,
        email: userEmail,
        classes: []
      });


      await newUser.save();

      user = newUser as TUser;

      res.status(200)
    }


    const token = generateJWT({
      id: user._id.toHexString()
    })

    res.json({token});

  } catch (error) {
    res.status(400);
    res.send(error)
  }


}

function generateJWT(data: {}) {

  return jwt.sign(data, JWT_SECRET, {
    expiresIn: '1h'
  });
}

async function getUserEmail(authCode: any) {
  const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

    const tokenResponse = await client.getToken({
      code: authCode,
      redirect_uri: "http://localhost:5173",
    });


    const accessToken = tokenResponse.tokens.access_token;

    client.setCredentials({
      access_token: accessToken
    })

    const userInfoResponse = await client.request<UserInfoResponse>({
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    const email = userInfoResponse.data.email;

    return email;
}


export async function getGoogleClientID(req: Request, res: Response) {
  res.json({GOOGLE_CLIENT_ID});
}