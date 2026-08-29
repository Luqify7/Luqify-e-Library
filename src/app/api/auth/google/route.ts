import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      {
        error:
          "Google Classroom integration is not configured. Please check GOOGLE_CLIENT_ID and GOOGLE_REDIRECT_URI.",
      },
      {
        status: 500,
      }
    );
  }

  const scopes = [
    "openid",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",

    // Google Classroom courses
    "https://www.googleapis.com/auth/classroom.courses.readonly",

    // Google Classroom coursework
    "https://www.googleapis.com/auth/classroom.coursework.me.readonly",

    // Google Classroom classwork materials
    "https://www.googleapis.com/auth/classroom.courseworkmaterials.readonly",
  ];

  const authorizationUrl = new URL(
    "https://accounts.google.com/o/oauth2/v2/auth"
  );

  authorizationUrl.searchParams.set(
    "client_id",
    clientId
  );

  authorizationUrl.searchParams.set(
    "redirect_uri",
    redirectUri
  );

  authorizationUrl.searchParams.set(
    "response_type",
    "code"
  );

  authorizationUrl.searchParams.set(
    "scope",
    scopes.join(" ")
  );

  authorizationUrl.searchParams.set(
    "access_type",
    "offline"
  );

  authorizationUrl.searchParams.set(
    "prompt",
    "consent"
  );

  return NextResponse.redirect(
    authorizationUrl.toString()
  );
}