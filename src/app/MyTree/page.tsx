"use client";

import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";

export default function MyTree() {
    const session = useSession();
    let q;

    if (session.status === "authenticated" && session.data.user.id) {
        console.log(session.data.user);
        q = api.MyTree.hasTree.useQuery(session.data?.user.id as string).data;
    }

    return (
        <div>
            <p>MyTree</p>
            {session.status === "authenticated" && q ? (
                <p>has tree</p>
            ) : (
                <p>no tree</p>
            )}
        </div>
    );
}
