import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const code = url.searchParams.get("code");
  const oauthError = url.searchParams.get("error");
  const oauthErrorDescription = url.searchParams.get(
    "error_description"
  );

  // Handle OAuth errors returned by Google
  if (oauthError) {
    console.error("GOOGLE OAUTH ERROR:", {
      error: oauthError,
      description: oauthErrorDescription,
    });

    return NextResponse.redirect(
      new URL(
        `/?google_classroom_error=${encodeURIComponent(
          oauthError
        )}`,
        request.url
      )
    );
  }

  // Make sure Google returned an authorization code
  if (!code) {
    console.error(
      "GOOGLE OAUTH CALLBACK: No authorization code received."
    );

    return NextResponse.redirect(
      new URL(
        "/?google_classroom_error=missing_authorization_code",
        request.url
      )
    );
  }

  // Read Google OAuth credentials
  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();

  const clientSecret =
    process.env.GOOGLE_CLIENT_SECRET?.trim();

  const configuredRedirectUri =
    process.env.GOOGLE_REDIRECT_URI?.trim();

  // Determine the callback URL being used by this request
  const actualCallbackUri = new URL(
    "/api/auth/google/callback",
    request.url
  ).toString();

  const redirectUri =
    configuredRedirectUri || actualCallbackUri;

  console.log(
    "GOOGLE OAUTH REDIRECT URI:",
    redirectUri
  );

  console.log(
    "GOOGLE OAUTH ACTUAL CALLBACK URI:",
    actualCallbackUri
  );

  // Check OAuth configuration
  if (!clientId || !clientSecret || !redirectUri) {
    console.error(
      "GOOGLE CLASSROOM OAUTH CONFIGURATION IS INCOMPLETE."
    );

    return NextResponse.redirect(
      new URL(
        "/?google_classroom_error=oauth_not_configured",
        request.url
      )
    );
  }

  try {
    // Exchange Google's authorization code for tokens
    const tokenResponse = await fetch(
      "https://oauth2.googleapis.com/token",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        }).toString(),
        cache: "no-store",
      }
    );

    const tokenData = await tokenResponse.json();

    // Google rejected the token exchange
    if (!tokenResponse.ok) {
      console.error(
        "GOOGLE TOKEN EXCHANGE FAILED:"
      );

      console.error(
        JSON.stringify(tokenData, null, 2)
      );

      return NextResponse.redirect(
        new URL(
          "/?google_classroom_error=token_exchange_failed",
          request.url
        )
      );
    }

    // Get access token
    const accessToken =
      typeof tokenData.access_token === "string"
        ? tokenData.access_token
        : "";

    // Get refresh token
    const refreshToken =
      typeof tokenData.refresh_token === "string"
        ? tokenData.refresh_token
        : "";

    // Make sure an access token was returned
    if (!accessToken) {
      console.error(
        "GOOGLE TOKEN RESPONSE DID NOT CONTAIN AN ACCESS TOKEN:"
      );

      console.error(
        JSON.stringify(tokenData, null, 2)
      );

      return NextResponse.redirect(
        new URL(
          "/?google_classroom_error=missing_access_token",
          request.url
        )
      );
    }

    // Redirect the user back to the library
    const response = NextResponse.redirect(
      new URL(
        "/?google_classroom=connected",
        request.url
      )
    );

    // Store access token securely in an HTTP-only cookie
    response.cookies.set(
      "google_classroom_access_token",
      accessToken,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60,
      }
    );

    // Store refresh token when Google provides one
    if (refreshToken) {
      response.cookies.set(
        "google_classroom_refresh_token",
        refreshToken,
        {
          httpOnly: true,
          secure:
            process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 365,
        }
      );
    }

    console.log(
      "GOOGLE CLASSROOM OAUTH SUCCESS"
    );

    console.log(
      "Access token received:",
      Boolean(accessToken)
    );

    console.log(
      "Refresh token received:",
      Boolean(refreshToken)
    );

    return response;
  } catch (error: unknown) {
    console.error(
      "GOOGLE CLASSROOM OAUTH CALLBACK ERROR:",
      error
    );

    return NextResponse.redirect(
      new URL(
        "/?google_classroom_error=callback_failed",
        request.url
      )
    );
  }
}