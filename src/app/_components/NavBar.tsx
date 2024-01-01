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
                    <UserDropDown user={session.data.user} />
                ) : (
                    <SignInButton />
                )}
            </div>
        </div>
    );
}

function UserDropDown(props: { user: any }) {
    return (
        <div className="group mr-4 text-base">
            <img width={65} src={props.user?.image} className="rounded-full" />
            <div className="absolute right-0 mr-4 scale-0 group-hover:scale-100">
                <div className="mt-2 w-40 space-y-1 rounded-lg bg-neutral-700 p-2">
                    <DropDownItemLink text={"Your Tree"} href="/MyTree" />
                    <DropDownItem text={"Sign Out"} onClick={() => signOut()} />
                </div>
            </div>
        </div>
    );
}

function DropDownItem(props: { text: string; onClick?: () => any }) {
    return (
        <button
            className="w-full rounded-md px-4 py-2 text-left transition-all hover:bg-neutral-800"
            onClick={props.onClick}
        >
            {props.text}
        </button>
    );
}

function DropDownItemLink(props: { text: string; href: string }) {
    return (
        <Link href={props.href}>
            <DropDownItem text={props.text} />
        </Link>
    );
}

function SignInButton() {
    return (
        <button
            className="mr-3.5 rounded-full bg-white p-5 text-black"
            onClick={() => signIn("github")}
        >
            Sign In
        </button>
    );
}
