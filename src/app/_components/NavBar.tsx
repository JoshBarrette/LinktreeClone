"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function NavBar() {
    const session = useSession();

    return (
        <div className="relative mx-24 mt-12 flex h-24 rounded-full bg-black text-2xl text-white">
            <div className="my-auto ml-16">
                <Link href="/">
                    <p>Clone</p>
                </Link>
            </div>

            <div className="my-auto ml-auto">
                {session.status === "authenticated" ? (
                    <div className="mr-3.5 flex">
                        <div className="my-auto mr-4 scale-150"></div>

                        <button
                            className="rounded-full bg-white p-5 text-black"
                            onClick={() => signOut()}
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <a href={process.env.CLERK_SIGN_IN_URL}>
                        <button
                            className="mr-3.5 rounded-full bg-white p-5 text-black"
                            onClick={() => signIn("github")}
                        >
                            Sign In
                        </button>
                    </a>
                )}
            </div>
        </div>
    );
}
