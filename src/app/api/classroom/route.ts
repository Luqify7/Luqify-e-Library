import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type GoogleCourse = {
  id?: string;
  name?: string;
  section?: string;
  descriptionHeading?: string;
  description?: string;
  room?: string;
  ownerId?: string;
  courseState?: string;
  alternateLink?: string;
};

type GoogleCourseWork = {
  courseId?: string;
  id?: string;
  title?: string;
  description?: string;
  state?: string;
  alternateLink?: string;
  creationTime?: string;
  updateTime?: string;
  dueDate?: {
    year?: number;
    month?: number;
    day?: number;
  };
  dueTime?: {
    hours?: number;
    minutes?: number;
  };
};

type GoogleCourseWorkMaterial = {
  courseId?: string;
  id?: string;
  title?: string;
  description?: string;
  state?: string;
  alternateLink?: string;
  creationTime?: string;
  updateTime?: string;
  materials?: Array<{
    driveFile?: {
      driveFile?: {
        id?: string;
        title?: string;
        alternateLink?: string;
        thumbnailUrl?: string;
      };
      shareMode?: string;
    };
  }>;
};

type GoogleListResponse<T> = {
  courses?: T[];
  courseWork?: T[];
  courseWorkMaterial?: T[];
  nextPageToken?: string;
};

type GoogleApiError = {
  error?: {
    code?: number;
    message?: string;
    status?: string;
    details?: unknown[];
  };
};

type GoogleTokenResponse = {
  access_token?: string;
  expires_in?: number;
  token_type?: string;
  refresh_token?: string;
  scope?: string;
  error?: string;
  error_description?: string;
};

type GoogleRequestResult<T> = {
  ok: boolean;
  status: number;
  data?: T;
  errorMessage?: string;
  errorStatus?: string;
};

function getGoogleErrorMessage(
  data: GoogleApiError | undefined,
  fallback: string
): string {
  return (
    data?.error?.message ||
    data?.error?.status ||
    fallback
  );
}

async function refreshGoogleAccessToken(
  refreshToken: string
): Promise<string | null> {
  const clientId =
    process.env.GOOGLE_CLIENT_ID?.trim();

  const clientSecret =
    process.env.GOOGLE_CLIENT_SECRET?.trim();

  if (!clientId || !clientSecret) {
    console.error(
      "GOOGLE CLASSROOM: OAuth client configuration is missing."
    );

    return null;
  }

  try {
    const response = await fetch(
      "https://oauth2.googleapis.com/token",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          refresh_token: refreshToken,
          grant_type: "refresh_token",
        }).toString(),
        cache: "no-store",
      }
    );

    const data =
      (await response.json()) as GoogleTokenResponse;

    if (!response.ok) {
      console.error(
        "GOOGLE CLASSROOM TOKEN REFRESH FAILED:",
        data
      );

      return null;
    }

    if (
      typeof data.access_token !==
      "string"
    ) {
      console.error(
        "GOOGLE CLASSROOM TOKEN REFRESH: No access token returned."
      );

      return null;
    }

    return data.access_token;
  } catch (error) {
    console.error(
      "GOOGLE CLASSROOM TOKEN REFRESH ERROR:",
      error
    );

    return null;
  }
}

async function googleClassroomRequest<T>(
  accessToken: string,
  endpoint: string
): Promise<GoogleRequestResult<T>> {
  try {
    const response = await fetch(
      `https://classroom.googleapis.com/v1/${endpoint}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    let data:
      | T
      | GoogleApiError
      | undefined;

    try {
      data =
        (await response.json()) as
          | T
          | GoogleApiError;
    } catch {
      data = undefined;
    }

    if (!response.ok) {
      const googleError =
        data as GoogleApiError | undefined;

      return {
        ok: false,
        status: response.status,
        errorMessage:
          getGoogleErrorMessage(
            googleError,
            `Google Classroom API returned HTTP ${response.status}.`
          ),
        errorStatus:
          googleError?.error?.status,
      };
    }

    return {
      ok: true,
      status: response.status,
      data: data as T,
    };
  } catch (error) {
    console.error(
      "GOOGLE CLASSROOM API REQUEST ERROR:",
      error
    );

    return {
      ok: false,
      status: 500,
      errorMessage:
        "Unable to contact Google Classroom.",
    };
  }
}

async function listAllCourses(
  accessToken: string
): Promise<GoogleCourse[]> {
  const courses: GoogleCourse[] = [];

  let pageToken = "";

  do {
    const query =
      new URLSearchParams();

    query.set(
      "courseStates",
      "ACTIVE"
    );

    query.set(
      "pageSize",
      "100"
    );

    if (pageToken) {
      query.set(
        "pageToken",
        pageToken
      );
    }

    const result =
      await googleClassroomRequest<
        GoogleListResponse<GoogleCourse>
      >(
        accessToken,
        `courses?${query.toString()}`
      );

    if (!result.ok) {
      const error = new Error(
        result.errorMessage ||
          `Google Classroom courses request failed with status ${result.status}.`
      );

      (
        error as Error & {
          status?: number;
        }
      ).status = result.status;

      throw error;
    }

    const currentCourses =
      result.data?.courses || [];

    courses.push(
      ...currentCourses
    );

    pageToken =
      result.data?.nextPageToken || "";
  } while (pageToken);

  return courses;
}

async function listCourseWork(
  accessToken: string,
  courseId: string
): Promise<GoogleCourseWork[]> {
  const coursework: GoogleCourseWork[] =
    [];

  let pageToken = "";

  do {
    const query =
      new URLSearchParams();

    query.set(
      "pageSize",
      "100"
    );

    query.set(
      "courseWorkStates",
      "PUBLISHED"
    );

    if (pageToken) {
      query.set(
        "pageToken",
        pageToken
      );
    }

    const result =
      await googleClassroomRequest<
        GoogleListResponse<GoogleCourseWork>
      >(
        accessToken,
        `courses/${encodeURIComponent(
          courseId
        )}/courseWork?${query.toString()}`
      );

    if (!result.ok) {
      console.warn(
        `GOOGLE CLASSROOM COURSEWORK FAILED FOR COURSE ${courseId}:`,
        result.status,
        result.errorMessage
      );

      break;
    }

    coursework.push(
      ...(result.data?.courseWork || [])
    );

    pageToken =
      result.data?.nextPageToken || "";
  } while (pageToken);

  return coursework;
}

async function listCourseWorkMaterials(
  accessToken: string,
  courseId: string
): Promise<GoogleCourseWorkMaterial[]> {
  const materials: GoogleCourseWorkMaterial[] =
    [];

  let pageToken = "";

  do {
    const query =
      new URLSearchParams();

    query.set(
      "pageSize",
      "100"
    );

    query.set(
      "courseWorkMaterialStates",
      "PUBLISHED"
    );

    if (pageToken) {
      query.set(
        "pageToken",
        pageToken
      );
    }

    const result =
      await googleClassroomRequest<
        GoogleListResponse<GoogleCourseWorkMaterial>
      >(
        accessToken,
        `courses/${encodeURIComponent(
          courseId
        )}/courseWorkMaterials?${query.toString()}`
      );

    if (!result.ok) {
      console.warn(
        `GOOGLE CLASSROOM MATERIALS FAILED FOR COURSE ${courseId}:`,
        result.status,
        result.errorMessage
      );

      break;
    }

    materials.push(
      ...(result.data?.courseWorkMaterial ||
        [])
    );

    pageToken =
      result.data?.nextPageToken || "";
  } while (pageToken);

  return materials;
}

function setAccessTokenCookie(
  response: NextResponse,
  accessToken: string
) {
  response.cookies.set(
    "google_classroom_access_token",
    accessToken,
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    }
  );
}

export async function GET() {
  try {
    const cookieStore =
      await cookies();

    let accessToken =
      cookieStore.get(
        "google_classroom_access_token"
      )?.value;

    const refreshToken =
      cookieStore.get(
        "google_classroom_refresh_token"
      )?.value;

    /*
     * ==================================================
     * NO ACCESS TOKEN
     * ==================================================
     */

    if (!accessToken) {
      if (!refreshToken) {
        return NextResponse.json(
          {
            connected: false,
            error:
              "Google Classroom is not connected. Please connect your Google account first.",
          },
          {
            status: 401,
          }
        );
      }

      /*
       * We have a refresh token but no access token.
       * Generate a fresh access token.
       */

      console.log(
        "GOOGLE CLASSROOM: Access token missing. Refreshing..."
      );

      const refreshedToken =
        await refreshGoogleAccessToken(
          refreshToken
        );

      if (!refreshedToken) {
        return NextResponse.json(
          {
            connected: false,
            error:
              "Google Classroom authorization has expired. Please connect Google Classroom again.",
          },
          {
            status: 401,
          }
        );
      }

      accessToken =
        refreshedToken;
    }

    /*
     * ==================================================
     * TRY CURRENT ACCESS TOKEN
     * ==================================================
     */

    let courses: GoogleCourse[] | null =
      null;

    let shouldSetNewToken = false;

    try {
      courses =
        await listAllCourses(
          accessToken
        );
    } catch (error) {
      console.warn(
        "GOOGLE CLASSROOM INITIAL REQUEST FAILED:",
        error
      );

      /*
       * ==================================================
       * ACCESS TOKEN FAILED — TRY REFRESH TOKEN
       * ==================================================
       */

      if (refreshToken) {
        console.log(
          "GOOGLE CLASSROOM: Attempting token refresh..."
        );

        const refreshedToken =
          await refreshGoogleAccessToken(
            refreshToken
          );

        if (refreshedToken) {
          try {
            courses =
              await listAllCourses(
                refreshedToken
              );

            accessToken =
              refreshedToken;

            shouldSetNewToken =
              true;

            console.log(
              "GOOGLE CLASSROOM: Access token successfully refreshed."
            );
          } catch (refreshError) {
            console.error(
              "GOOGLE CLASSROOM: Refreshed token also failed:",
              refreshError
            );

            courses = null;
          }
        }
      }
    }

    /*
     * ==================================================
     * STILL NO COURSES
     * ==================================================
     */

    if (!courses) {
      return NextResponse.json(
        {
          connected: false,
          error:
            "Google Classroom could not authorize this request. Please reconnect your Google Classroom account.",
        },
        {
          status: 401,
        }
      );
    }

    /*
     * ==================================================
     * BUILD CLASSROOM RESPONSE
     * ==================================================
     */

    const response =
      await buildClassroomResponse(
        accessToken,
        courses
      );

    if (shouldSetNewToken) {
      setAccessTokenCookie(
        response,
        accessToken
      );
    }

    return response;
  } catch (error) {
    console.error(
      "GOOGLE CLASSROOM API ERROR:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Unable to retrieve Google Classroom data right now.";

    return NextResponse.json(
      {
        connected: false,
        error: message,
      },
      {
        status: 502,
      }
    );
  }
}

async function buildClassroomResponse(
  accessToken: string,
  courses: GoogleCourse[]
): Promise<NextResponse> {
  const courseData: Array<{
    id: string;
    name: string;
    section: string;
    description: string;
    room: string;
    courseState: string;
    alternateLink: string;
    coursework: GoogleCourseWork[];
    materials: GoogleCourseWorkMaterial[];
  }> = [];

  /*
   * Prevent excessively large requests.
   */

  const coursesToRead =
    courses.slice(0, 20);

  for (const course of coursesToRead) {
    if (!course.id) {
      continue;
    }

    const [
      coursework,
      materials,
    ] = await Promise.all([
      listCourseWork(
        accessToken,
        course.id
      ),
      listCourseWorkMaterials(
        accessToken,
        course.id
      ),
    ]);

    courseData.push({
      id: course.id,

      name:
        course.name ||
        "Unnamed Classroom course",

      section:
        course.section || "",

      description:
        course.description || "",

      room:
        course.room || "",

      courseState:
        course.courseState || "",

      alternateLink:
        course.alternateLink || "",

      coursework,

      materials,
    });
  }

  return NextResponse.json({
    connected: true,
    courseCount: courses.length,
    courses: courseData,
  });
}