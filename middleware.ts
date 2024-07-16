import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

const isProtected = createRouteMatcher(["/home(.*)", "/create(.*)"]);

export default clerkMiddleware((auth, req: NextRequest) => {
  if (isProtected(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
