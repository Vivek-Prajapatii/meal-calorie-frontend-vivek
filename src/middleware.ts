import { default as NextAuthMiddleware } from "next-auth/middleware";

export default NextAuthMiddleware;

export const config = {
  matcher: ["/dashboard/:path*", "/calories/:path*"],
};
