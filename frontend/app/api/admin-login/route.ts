import { NextResponse } from "next/server";

const ADMIN_PIN = "0000";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (body?.pin !== ADMIN_PIN) {
    return NextResponse.json({ message: "PIN incorrecto" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("ds_admin_auth", "true", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
