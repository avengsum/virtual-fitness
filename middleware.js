import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ['/','/register','/login']
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 