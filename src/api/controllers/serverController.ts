import { Request, Response } from "express";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET, REDIRECT_URI } from "../config";
import { OAuth2Client } from "google-auth-library";
import User from "../model/User";
import { TUser } from "../../types/TUser";
import jwt from 'jsonwebtoken';
import { calendar_v3, google } from "googleapis";
import moment from 'moment';

interface UserInfoResponse {
  email: string
}

export async function initAuth(req: Request, res: Response) {
  const googleAuthCode = req.body.code

  try {
    const emailAndToken = await getUserEmailAndRefreshToken(googleAuthCode);

    let user = await User.findOne({ email: emailAndToken.email }) as unknown as TUser;

    if (!user) {
      // CREATE NEW USER
      let newUser = new User({
        refreshToken: emailAndToken.refreshToken,
        email: emailAndToken.email,
        classes: []
      });


      await newUser.save();

      user = newUser as TUser;

      res.status(200)
    }


    const token = generateJWT({
      id: user._id.toHexString()
    })

    res.json({ token });

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

async function getUserEmailAndRefreshToken(authCode: any) {
  const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

  const tokenResponse = await client.getToken({
    code: authCode,
    redirect_uri: REDIRECT_URI,
  });


  const accessToken = tokenResponse.tokens.access_token;
  const refreshToken = tokenResponse.tokens.refresh_token;

  client.setCredentials({
    access_token: accessToken
  });

  const userInfoResponse = await client.request<UserInfoResponse>({
    url: 'https://www.googleapis.com/oauth2/v3/userinfo',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  const email = userInfoResponse.data.email;

  return { email, refreshToken };
}


export async function getGoogleClientID(req: Request, res: Response) {
  res.json({ GOOGLE_CLIENT_ID });
}


export function checkForLoggedIn(req: Request, res: Response) {
  // This function will run ONLY if the user's token is valid, middleware
  // will throw a 401 status if it is not valid

  res.status(200);
  res.send();
}


export async function createEvent(req: Request, res: Response) {
  try {
    // TESTING GOOGLE CALENDER API
    const userID = req.body.id;
    const eventSummary = req.body.eventTitle
    const eventDate = req.body.eventDay
    const formattedDate = moment(eventDate, 'MM/DD/YYYY').format('YYYY-MM-DD');

    const theUser = await User.findById(userID) as unknown as TUser;
    const userRefreshToken = theUser.refreshToken;

    const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
    client.setCredentials({
      refresh_token: userRefreshToken
    })


    const userAccessTokenResponse = await client.refreshAccessToken();


    const calendar = google.calendar({
      'version': 'v3',
      auth: client
    });


    const event: calendar_v3.Schema$Event = {
      summary: eventSummary,
      start: {
        date: formattedDate,
        timeZone: "America/Los_Angeles",
      },
      end: {
        date: formattedDate,
        timeZone: "America/Los_Angeles",
      },
    };


    const googleCalendarResponse = await calendar.events.insert({
      calendarId: 'primary',
      auth: client,
      requestBody: event
    })

    res.status(200)
    res.send(googleCalendarResponse.data);
  } catch (error) {
    res.status(500)
  }

}