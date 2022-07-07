// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  if (req.nextUrl.pathname.startsWith("/api/*")) {
    console.log("ignored");
    return;
  }

  const slug = req.nextUrl.pathname.split("/").pop();

  console.log("slug", slug);

  if (!slug || slug.length === 0) {
    return NextResponse.redirect("/");
  }

  const data = await (
    await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`)
  ).json();

  if (data?.url) {
    return NextResponse.redirect(data.url);
  }

  return NextResponse.redirect("/");
};

export const config = {
  matcher: ["/u/:path*"],
};
