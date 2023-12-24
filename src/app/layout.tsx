import { ClerkProvider } from "@clerk/nextjs";
import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`font-sans ${inter.variable}`}>
                    <TRPCReactProvider cookies={cookies().toString()}>
                        {children}
                    </TRPCReactProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
