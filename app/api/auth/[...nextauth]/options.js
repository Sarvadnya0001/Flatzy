import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/UserSchema";
import bcrypt from "bcrypt";

export const options = {
  providers: [
    //   GitHubProvider({
    //     profile(profile) {
    //       console.log("Profile GitHub: ", profile);

    //       let userRole = "GitHub User";
    //       if (profile?.email == "jake@claritycoders.com") {
    //         userRole = "admin";
    //       }

    //       return {
    //         ...profile,
    //         role: userRole,
    //       };
    //     },
    //     clientId: process.env.GITHUB_ID,
    //     clientSecret: process.env.GITHUB_Secret,
    //   }),
    //   GoogleProvider({
    //     profile(profile) {
    //       console.log("Profile Google: ", profile);

    //       let userRole = "Google User";
    //       return {
    //         ...profile,
    //         id: profile.sub,
    //         role: userRole,
    //       };
    //     },
    //     clientId: process.env.GOOGLE_ID,
    //     clientSecret: process.env.GOOGLE_Secret,
    //   }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email:", type: "text", placeholder: "your-email" },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        try {
          const foundUser = await User.findOne({ email: credentials.email })
            .lean()
            .exec();

          if (!foundUser) return null;

          const match = await bcrypt.compare(
            credentials.password,
            foundUser.password
          );

          if (!match) return null;

          console.log("✅ User authenticated:", foundUser.email);

          // remove password before returning
          const { password, ...userWithoutPass } = foundUser;

          return {
            ...userWithoutPass,
            role: foundUser.role || "user",
          };
        } catch (error) {
          console.error("❌ Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
};
