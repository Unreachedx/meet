'use strict';

const { google } = require("googleapis");
const calendar = google.calendar("v3");
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = [
  "https://unreachedx.github.io/meet/"
];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

module.exports.getAuthURL = async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({
      authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  // Decode authorization code extracted from the URL query
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  })
    .then((results) => {
      // Respond with OAuth token 
      return {
        statusCode: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify(results),
      };
    })
    .catch((error) => {
      // Handle error
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};

module.exports.getCalendarEvents = async (event) => {
  // Decode authorization code extracted from the URL query
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (error, response) => {
      if (error) {
        return reject(error);
      }

      const access_token = response.access_token;

      oAuth2Client.setCredentials({ access_token });

      // Get Calendar events
      calendar.events.list(
        {
          calendarId: CALENDAR_ID,
          auth: oAuth2Client,
          timeMin: new Date().toISOString(), // Retrieves events starting from now
          maxResults: 10, // Limit the number of results
          singleEvents: true,
          orderBy: 'startTime',
        },
        (err, res) => {
          if (err) return reject(err);
          return resolve(res.data.items);
        }
      );
    });
  })
  .then((results) => {
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(results),
    };
  })
    .catch((error) => {
      // Handle error
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};
