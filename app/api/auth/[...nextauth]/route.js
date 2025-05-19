import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import GoogleProvider from "next-auth/providers/google";
import connectDb from '@/db/connectDb';
import User from '@/models/User';
import Payment from '@/models/Payment';

export const authoptions = NextAuth({
  providers: [
    // OAuth authentication providers...
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    //   AppleProvider({
    //     clientId: process.env.APPLE_ID,
    //     clientSecret: process.env.APPLE_SECRET
    //   }),
    //   FacebookProvider({
    //     clientId: process.env.FACEBOOK_ID,
    //     clientSecret: process.env.FACEBOOK_SECRET
    //   }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    //   // Passwordless / email sign in
    //   EmailProvider({
    //     server: process.env.MAIL_SERVER,
    //     from: 'NextAuth.js <no-reply@example.com>'
    //   }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === "github" || account.provider === "google") {
        await connectDb();
        // Check if the user already exists in the database
        const currentUser = await User.findOne({ email: user.email });
        if (!currentUser) {
          // Create a new user
          await User.create({
            email: user.email,
            username: user.email.split("@")[0],
          });
        }
        return true;
      }
      // Return true by default to not block signIn for other providers
      return true;
    },

    async session({ session, user, token }) {
      const dbUserDoc = await User.findOne({ email: session.user.email });
      if (dbUserDoc) {
        const dbUser = dbUserDoc.toObject();
        session.user.name = dbUser.username || dbUser.name || session.user.name;
        session.user.profilepic = dbUser.profilepic || null;
      }
      // session.user.name = dbUser.username
      return session;
    },
  },
});

export { authoptions as GET, authoptions as POST };
