import { AuthOptions, DefaultUser, User } from "next-auth";
import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "~/server/db";

export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(db),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            session.user.id = token.sub;
            return session;
        },
    },
    // events: {
    //     signIn: ({ user, account, profile, isNewUser }) => {},
    // },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
