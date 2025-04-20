// app/api/auth/[...nextauth]/route.ts (or route.js)
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github" // Import GitHub provider

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({ // Add GitHub provider
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      return true; // Allow sign-in
    },
    async redirect({ url, baseUrl }) {
      return baseUrl; // Redirect to the base URL
    },
  },
})
