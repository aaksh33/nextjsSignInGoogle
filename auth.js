import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        console.log("User data:", user);
        console.log("Account data:", account);

        const payload = {
          name: user.name,
          email: user.email,
          image: user.image,
          provider: account.provider,
        };
        console.log("Payload being sent to API:", payload);

        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          console.error("API response error:", errorResponse);
          throw new Error("Failed to save user data");
        }

        console.log("User data sent to the database successfully");
        return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl; // Redirect to the base URL
    },
  },
});
