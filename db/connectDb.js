import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      try {
        console.log("SIGNIN STARTED");
        await connectDb();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({
            email: user.email,
            username: user.email.split("@")[0],
          });
        }
        console.log("SIGNIN SUCCESSFUL");
        return true;
      } catch (err) {
        console.error("SIGNIN ERROR:", err);
        return false;
      }
    },

    async session({ session }) {
      try {
        console.log("SESSION CALLBACK STARTED");
        await connectDb();
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          const userObj = dbUser.toObject();
          session.user.name = userObj.username || userObj.name || session.user.name;
          session.user.profilepic = userObj.profilepic || null;
        }
        return session;
      } catch (err) {
        console.error("SESSION CALLBACK ERROR:", err);
        return session;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
