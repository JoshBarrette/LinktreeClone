import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
    ],
    events: {
        signIn: ({ user, account, profile, isNewUser }) => {},
    },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
