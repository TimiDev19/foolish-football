// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const body = await req.json();

//   const res = await fetch(
//     "https://api.foolishfootball.site/api/auth/login",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     }
//   );

//   const data = await res.json();

//   if (!res.ok) {
//     return NextResponse.json(
//       { message: "Invalid credentials" },
//       { status: 401 }
//     );
//   }

//   // Store token in httpOnly cookie (secure)
//   const response = NextResponse.json({ admin: data.admin });

//   response.cookies.set("token", data.token, {
//     httpOnly: true,
//     secure: true,
//     sameSite: "strict",
//     path: "/",
//   });

//   return response;
// }

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(
      "https://api.foolishfootball.site/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { message: data.message || "Invalid credentials" },
        { status: res.status }
      );
    }

    const response = NextResponse.json({ admin: data.admin });

    response.cookies.set("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("LOGIN API ERROR:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}