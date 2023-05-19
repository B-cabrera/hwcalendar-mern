import { Request, Response } from "express";
import Users from "../model/User";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../config";
import { OAuth2Client } from "google-auth-library";

interface UserInfoResponse {
  email: string
}

export async function initAuth(req: Request, res: Response) {
  const googleAuthCode = req.body.code

  try {

    const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

    const tokenResponse = await client.getToken({
      code: googleAuthCode,
      redirect_uri: "http://localhost:5173",
    });

    const accessToken = tokenResponse.tokens.access_token;

    client.setCredentials({
      access_token: accessToken
    })

    const userInfoResponse = await client.request<UserInfoResponse>({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo'
    })

    const email = userInfoResponse.data.email;

    // TODO: CHECK IF USER EXISTS, IF THEY DONT CREATE USER AND THEN CREATE A JWT

  } catch (error) {
    res.status(400);
    res.send(error)
  }


}


export async function getGoogleClientID(req: Request, res: Response) {
  res.json({GOOGLE_CLIENT_ID});
}