import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { getServerSession } from "next-auth";
import SessionProvider from "./_components/SessionProvider";
import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata = {
    title: "Clone",
    description: "Clone",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession();

    return (
        <html lang="en">
            <body className={`font-sans ${inter.variable}`}>
                <TRPCReactProvider cookies={cookies().toString()}>
                    <SessionProvider session={session}>
                        {children}
                    </SessionProvider>
                </TRPCReactProvider>
            </body>
        </html>
    );
}
