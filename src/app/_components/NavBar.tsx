"use client";

import {
    SignOutButton,
    UserButton,
    useUser,
} from "@clerk/nextjs";
import Link from "next/link";

export default function NavBar() {
    const user = useUser();

    return (
        <div className="relative mx-24 mt-12 flex h-24 rounded-full bg-black text-2xl text-white">
            <div className="my-auto ml-16">
                <Link href="/">
                    <p>Clone</p>
                </Link>
            </div>

            <div className="my-auto ml-auto">
                {user.isSignedIn ? (
                    <div className="mr-3.5 flex">
                        <div className="my-auto mr-4 scale-150">
                            <UserButton />
                        </div>
                        <SignOutButton>
                            <button className="rounded-full bg-white p-5 text-black">
                                Sign Out
                            </button>
                        </SignOutButton>
                    </div>
                ) : (
                    <a href={process.env.CLERK_SIGN_IN_URL}>
                        <button className="mr-3.5 rounded-full bg-white p-5 text-black">
                            Sign In
                        </button>
                    </a>
                )}
            </div>
        </div>
    );
}
