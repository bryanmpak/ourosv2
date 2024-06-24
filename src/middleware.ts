import { clerkMiddleware } from "@clerk/nextjs/server"

console.log("Middleware initialized")

const customClerkMiddleware = (req, res) => {
  console.log("Request URL:", req.url)
  return clerkMiddleware()(req, res)
}

export default customClerkMiddleware

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
